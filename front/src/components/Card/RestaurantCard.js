import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";
import likeImg from "../../assets/icons/like.svg";
import heartFilledIcon from "../../assets/icons/heart2.svg";
import { favoritesService } from "../../utils/favorites";

export const RestaurantCard = ({ restaurant, onRemove }) => {
  const { id, name, country, city, image } = restaurant;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const favoriteStatus = favoritesService.isFavorite(id);
      setIsFavorite(favoriteStatus);
    }
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      favoritesService.remove(id);
      setIsFavorite(false);
      if (onRemove) {
        onRemove(id);
      }
    } else {
      favoritesService.add(id);
      setIsFavorite(true);
    }
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
              src={image}
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
          src={isFavorite ? heartFilledIcon : likeImg}
          alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          width="32"
          height="32"
        />
      </button>
    </div>
  );
};