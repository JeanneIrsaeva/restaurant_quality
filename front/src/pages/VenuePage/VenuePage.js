import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Gallery from '../../components/Gallery/Gallery';
import RatingTable from '../../components/RatingTable/RatingTable';
import LocationInfo from '../../components/LocationInfo/LocationInfo';
import YandexMap from '../../components/YandexMap/YandexMap';
import './VenuePage.css';

import likeIcon from '../../assets/icons/like.svg';
import heartFilledIcon from '../../assets/icons/heart2.svg';

const VenuePage = () => {
    const [isFavorite, setIsFavorite] = useState(false);
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

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="venue-page">
            <Breadcrumbs />

            <div className="venue-container">

                <div className="venue-header">
                    <div className="venue-title-section">
                        <h1 className="venue-title">Ресторан Claude Monet</h1>
                        <div className="rating">
                            <img src="/assets/svg/star.svg" alt="Рейтинг" className="star-icon" />
                            <span className="rating-value">5,0</span>
                        </div>
                    </div>

                    <button className="favorite-btn" onClick={toggleFavorite}>
                        <img
                            src={isFavorite ? heartFilledIcon : likeIcon}
                            alt="Добавить в избранное"
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
                        Меню Claude Monet — это гастрономическая симфония, вдохновлённая французской <br />
                        классикой и утончённой простотой. Здесь каждый штрих — как мазок на полотне: сливочный <br />
                        соус бер блан нежно оттеняет морского сибаса, тающий во рту конфи из утки раскрывает <br />
                        глубину вкуса, а десерт с ванильным кремом и лепестками лаванды завершает ужин лёгкой <br />
                        нотой Прованса. Это не просто ужин — это момент, где искусство встречается со вкусом.
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
                <RatingTable />
            </div>

            <div className="divider"></div>

            <div className="venue-container">
                <LocationInfo />
            </div>

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
                            address="ул. Петровка, 28, Москва"
                            center={[55.7649, 37.6190]}
                            zoom={16}
                        />
                    </div>

                </div>
            </div>

        </div >
    );
};

export default VenuePage;