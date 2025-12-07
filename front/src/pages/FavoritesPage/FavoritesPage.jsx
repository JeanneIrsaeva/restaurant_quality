
import React, { useState, useEffect } from 'react';
import { favoritesService } from '../../utils/favorites';
import { RestaurantCard } from '../../components/Card/RestaurantCard';
import heartFilledIcon from '../../assets/icons/heart2.svg';
import './FavoritesPage.css';

const FavoritesPage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ids = favoritesService.getAll();
        setFavoriteIds(ids);

        if (ids.length > 0) {
            const mockRestaurants = ids.map((id, index) => ({
                id,
                name: `Ресторан ${id.substring(0, 8)}`,
                country: 'Россия',
                city: 'Москва',
                image: '/assets/images/venue.jpg',
                rating: 4.0 + (index * 0.5)
            }));
            setRestaurants(mockRestaurants);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div className="favorites-loading">Загрузка...</div>;
    }

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <h1 className="favorites-title">Избранное</h1>

                {favoriteIds.length === 0 ? (
                    <div className="favorites-empty">
                        <img
                            src={heartFilledIcon}
                            alt="Пустое избранное"
                            className="empty-icon"
                        />
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте понравившиеся заведения, нажимая на сердечко</p>
                        <a href="/catalog" className="browse-button">Перейти в каталог</a>
                    </div>
                ) : (
                    <>
                        <div className="favorites-count">
                            Найдено заведений: <span>{restaurants.length}</span>
                        </div>

                        <div className="favorites-grid">
                            {restaurants.map(restaurant => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;