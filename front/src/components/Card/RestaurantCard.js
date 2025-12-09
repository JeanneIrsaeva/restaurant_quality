import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

export const RestaurantCard = ({ restaurant, onRemove }) => {
  const { id, name, country, city, image } = restaurant;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      // Проверяем через localStorage напрямую
      const favorites = JSON.parse(localStorage.getItem('verve_favorites')) || [];
      setIsFavorite(favorites.includes(id.toString()));
    }
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem('verve_favorites')) || [];

    if (isFavorite) {
      favorites = favorites.filter(favId => favId !== id.toString());
      setIsFavorite(false);
      if (onRemove) {
        onRemove(id);
      }
    } else {
      if (!favorites.includes(id.toString())) {
        favorites.push(id.toString());
      }
      setIsFavorite(true);
    }

    localStorage.setItem('verve_favorites', JSON.stringify(favorites));
  };

  const handleImageError = (e) => {
    console.warn("Ошибка загрузки изображения:", image);
    e.target.src = '/assets/images/venue.jpg';
    e.target.onerror = null;
  };

  return (
    <div className="card-wrapper">
      <Link to={`/venue/${id}`} className="card-link">
        <div className="card">
          <div className="card__thumb">
            <img
              src={image || '/assets/images/venue.jpg'}
              alt={name}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <div className="card__body">
            <h3 className="card__title">{name}</h3>
            <p className="card__location">
              {country}, {city}
            </p>
          </div>
        </div>
      </Link>
      <button
        className="card__like-btn"
        onClick={handleFavoriteClick}
        title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        <img
          className="card__like"
          src={isFavorite ? '/assets/svg/icons/heart2.svg' : '/assets/svg/icons/like.svg'}
          alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          width="32"
          height="32"
        />
      </button>
    </div>
  );
};