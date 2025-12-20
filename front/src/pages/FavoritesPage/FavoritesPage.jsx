import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { favoritesService } from '../../utils/favorites';
import { RestaurantCard } from '../../components/Card/RestaurantCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        console.log("=== Загрузка избранного ===");
        setLoading(true);

        try {
            const favoritesData = await favoritesService.getFavoritesDetails();
            console.log("Данные получены:", favoritesData);
            setRestaurants(favoritesData);
        } catch (error) {
            console.error("Ошибка загрузки избранного:", error);
            setRestaurants([]);
        }

        setLoading(false);
    };

    const handleRemove = (id) => {
        console.log("Удаляем из избранного:", id);
        favoritesService.remove(id);
        loadFavorites();
    };

    if (loading) {
        return <div className="favorites-loading">Загрузка избранного...</div>;
    }

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <h1 className="favorites-title">Избранное</h1>

                {restaurants.length === 0 ? (
                    <div className="favorites-empty">
                        <img
                            src="/assets/svg/icons/heart2.svg"
                            alt="Пустое избранное"
                            className="empty-icon"
                        />
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте понравившиеся заведения, нажимая на сердечко</p>
                        <RouterLink to="/catalog" className="browse-button">Перейти в каталог</RouterLink>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {restaurants.map(restaurant => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;