
import React, { useState, useEffect } from "react";
import "./RestaurantCard.css";
import likeImg from "../../assets/icons/like.svg";
import heartFilledIcon from "../../assets/icons/heart2.svg";
import { favoritesService } from "../../utils/favorites";

export const RestaurantCard = ({ restaurant }) => {
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
    } else {
      favoritesService.add(id);
      setIsFavorite(true);
    }
  };

  return (
    <div className="card">
      <div className="card__thumb">
        <img src={image} alt={name} />
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__location">
          {country}, {city}
        </p>
        <button
          className="card__like-btn"
          onClick={handleFavoriteClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <img
            className="card__like"
            src={isFavorite ? heartFilledIcon : likeImg}
            alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          />
        </button>
      </div>
    </div>
  );
};