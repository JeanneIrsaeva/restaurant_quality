import React from "react";
import "./../Card/RestaurantCard.css";
import likeImg from "../../assets/icons/like.svg";

export const RestaurantCard = ({ restaurant }) => {
  const { name, country, city, image } = restaurant;

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
        <img className="card__like" src={likeImg} alt="like" />
      </div>
    </div>
  );
};
