import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Gallery from '../../components/Gallery/Gallery';
import RatingTable from '../../components/RatingTable/RatingTable';
import LocationInfo from '../../components/LocationInfo/LocationInfo';
import YandexMap from '../../components/YandexMap/YandexMap';
import './VenuePage.css';

import likeIcon from '../../assets/icons/like.svg';
import heartFilledIcon from '../../assets/icons/heart2.svg';
import { favoritesService } from '../../utils/favorites';

const VenuePage = () => {

    const establishmentId = '4aaff4d5-069a-475e-a5aa-faa36b8207a0'; // La Belle Étoile

    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const galleryImages = [
        '/assets/images/venue.jpg',
        '/assets/images/venue2.jpg'
    ];

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
                        name: 'La Belle Étoile',
                        description: 'Элегантный французский ресторан с панорамным видом на город',
                        rating: 4.8,
                        address: 'ул. Тверская, 15, Москва',
                        contact_phone: '+7 (495) 123-45-67',
                        contact_email: 'info@labelleetoile.ru',
                        open_hours: '12:00-23:00'
                    });
                }
            } catch (error) {
                console.error("Ошибка загрузки ресторана:", error);

                setRestaurant({
                    id: establishmentId,
                    name: 'La Belle Étoile',
                    description: 'Элегантный французский ресторан с панорамным видом на город',
                    rating: 4.8,
                    address: 'ул. Тверская, 15, Москва',
                    contact_phone: '+7 (495) 123-45-67',
                    contact_email: 'info@labelleetoile.ru',
                    open_hours: '12:00-23:00'
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
        name: 'La Belle Étoile',
        rating: 4.8,
        description: 'Элегантный французский ресторан с панорамным видом на город. Меню вдохновлено французской классикой с современными акцентами.',
        address: 'ул. Тверская, 15, Москва',
        contact_phone: '+7 (495) 123-45-67',
        contact_email: 'info@labelleetoile.ru',
        open_hours: '12:00-23:00'
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
                            <span className="rating-value">{displayData.rating?.toFixed(1) || '4.8'}</span>
                        </div>
                    </div>

                    <button
                        className="favorite-btn"
                        onClick={toggleFavorite}
                        title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                        <img
                            src={isFavorite ? heartFilledIcon : likeIcon}
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
                        {displayData.description ||
                            `Меню ${displayData.name} — это гастрономическая симфония, вдохновлённая французской классикой и утончённой простотой. Здесь каждый штрих — как мазок на полотне: сливочный соус бер блан нежно оттеняет морского сибаса, тающий во рту конфи из утки раскрывает глубину вкуса, а десерт с ванильным кремом и лепестками лаванды завершает ужин лёгкой нотой Прованса. Это не просто ужин — это момент, где искусство встречается со вкусом.`}
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
                    address={displayData.address || 'ул. Тверская, 15, Москва'}
                    phone={displayData.contact_phone || '+7 (495) 123-45-67'}
                    email={displayData.contact_email || 'info@labelleetoile.ru'}
                    hours={displayData.open_hours || '12:00-23:00'}
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
                            address={displayData.address || 'ул. Тверская, 15, Москва'}
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