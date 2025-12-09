import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Gallery from '../../components/Gallery/Gallery';
import RatingTable from '../../components/RatingTable/RatingTable';
import LocationInfo from '../../components/LocationInfo/LocationInfo';
import YandexMap from '../../components/YandexMap/YandexMap';
import './VenuePage.css';
import { favoritesService } from '../../utils/favorites';

const VenuePage = () => {
    const { id } = useParams();
    const establishmentId = id;

    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const galleryImages = restaurant?.images
        ? JSON.parse(restaurant.images).map(img => {
            if (img.startsWith('/images/')) return '/assets' + img;
            return img;
        })
        : ['/assets/images/venue.jpg'];


    const chefRecommendations = [
        {
            image: '/assets/images/dish1.jpg',
            text: 'Свежий салат с сыром и овощами'
        },
        {
            image: '/assets/images/dish2.jpg',
            text: 'Шашлык из курицы с вишней и зеленым салатом'
        },
        {
            image: '/assets/images/dish3.jpg',
            text: 'Овощной салат с жареными креветками'
        }
    ];

    useEffect(() => {
        const loadRestaurantData = async () => {
            setLoading(true);
            try {
                console.log("Загружаем данные ресторана:", establishmentId);
                const response = await fetch(`http://localhost:8000/establishments/${establishmentId}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Данные ресторана получены:", data);
                    setRestaurant(data);
                } else {
                    console.warn("Не удалось загрузить данные ресторана:", response.status);

                    setRestaurant({
                        id: establishmentId,
                        name: 'Ресторан',
                        description: 'Описание ресторана',
                        rating: 4.5,
                        address: 'Адрес не указан',
                        city: 'Москва',
                        contact_phone: 'Телефон не указан',
                        open_hours: '12:00-23:00',
                        link_to: 'https://example.com'
                    });
                }
            } catch (error) {
                console.error("Ошибка загрузки ресторана:", error);

                setRestaurant({
                    id: establishmentId,
                    name: 'Ресторан',
                    description: 'Описание ресторана',
                    rating: 4.5,
                    address: 'Адрес не указан',
                    city: 'Москва',
                    contact_phone: 'Телефон не указан',
                    open_hours: '12:00-23:00',
                    link_to: 'https://example.com'
                });
            } finally {
                setLoading(false);
            }
        };

        loadRestaurantData();
    }, [establishmentId]);

    useEffect(() => {
        const checkFavoriteStatus = () => {
            const favoriteStatus = favoritesService.isFavorite(establishmentId);
            setIsFavorite(favoriteStatus);
        };

        checkFavoriteStatus();

        const handleStorageChange = (e) => {
            if (e.key === favoritesService.FAVORITES_KEY || e.key === 'verve_favorites') {
                checkFavoriteStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [establishmentId]);

    const toggleFavorite = () => {
        if (isFavorite) {
            favoritesService.remove(establishmentId);
            setIsFavorite(false);
            console.log('Удалено из избранного:', establishmentId);
        } else {
            favoritesService.add(establishmentId);
            setIsFavorite(true);
            console.log('Добавлено в избранное:', establishmentId);
        }
    };

    if (loading) {
        return (
            <div className="venue-page">
                <div className="venue-container">
                    <div className="loading" style={{ padding: '50px', textAlign: 'center' }}>
                        Загрузка ресторана...
                    </div>
                </div>
            </div>
        );
    }

    const displayData = restaurant || {
        name: 'Ресторан',
        rating: 4.5,
        description: 'Описание ресторана',
        address: 'Адрес не указан',
        city: 'Москва',
        contact_phone: 'Телефон не указан',
        open_hours: '12:00-23:00',
        link_to: 'https://example.com'
    };

    return (
        <div className="venue-page">
            <Breadcrumbs
                items={[
                    { label: 'Каталог', path: '/catalog' },
                    { label: displayData.name, path: null }
                ]}
            />

            <div className="venue-container">
                <div className="venue-header">
                    <div className="venue-title-section">
                        <h1 className="venue-title">{displayData.name}</h1>
                        <div className="rating">
                            <img src="/assets/svg/star.svg" alt="Рейтинг" className="star-icon" />
                            <span className="rating-value">{displayData.rating?.toFixed(1) || '4.5'}</span>
                        </div>
                    </div>

                    <button
                        className="favorite-btn"
                        onClick={toggleFavorite}
                        title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                        <img
                            src={isFavorite ? '/assets/svg/icons/heart2.svg' : '/assets/svg/icons/like.svg'}
                            alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                            width="32"
                            height="32"
                        />
                    </button>
                </div>

                <Gallery images={galleryImages} />
            </div>

            <div className="divider"></div>

            <div className="venue-container">
                <section className="description-section">
                    <p className="description-text">
                        {displayData.description || 'Описание ресторана отсутствует.'}
                    </p>

                    <div className="recommendations-section">
                        <h2 className="section-title">Рекомендации шефа</h2>
                        <div className="recommendations-grid">
                            {chefRecommendations.map((recommendation, index) => (
                                <div key={index} className="recommendation-card">
                                    <img
                                        src={recommendation.image}
                                        alt={recommendation.text}
                                        className="recommendation-image"
                                        onError={(e) => {
                                            e.target.src = '/assets/images/venue.jpg';
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <p className="recommendation-text">{recommendation.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="divider"></div>

            <div className="venue-container">
                <RatingTable establishmentId={establishmentId} />
            </div>

            <div className="divider"></div>

            <div className="venue-container">
                <LocationInfo
                    address={displayData.address || 'Адрес не указан'}
                    city={displayData.city || 'Москва'}
                    phone={displayData.contact_phone || 'Телефон не указан'}
                    hours={displayData.open_hours || '12:00-23:00'}
                    website={displayData.link_to || 'https://example.com'}
                />
            </div>

            <div className="divider"></div>

            <div className="venue-container">
                <div className="location-quote-section">
                    <div className="quote-content">
                        <h2 className="section-title-location">Наше <br />местоположение</h2>
                        <div className="quote-block">
                            <p className="quote-text">
                                «Вкус обретает форму, а вдохновение — координаты».
                            </p>
                        </div>
                    </div>

                    <div className="map-block">
                        <YandexMap
                            address={displayData.address || 'Адрес не указан'}
                            center={[55.7649, 37.6190]}
                            zoom={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenuePage;