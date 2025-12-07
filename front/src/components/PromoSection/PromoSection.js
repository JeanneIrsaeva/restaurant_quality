import React from "react";
import { Link } from "react-router-dom";
import "./PromoSection.css";
import placeholderImg from './../../img/placeholder.jpg'

export const PromoSection = () => {
  return (
    <section className="promo-section">
      <div className="promo-container">
        <div className="promo-content">
          <h1 className="promo-title">Сервис оценки премиальных заведений</h1>
          <p className="promo-description">
            В мире высокой гастрономии репутация часто опережает качество. Verve —
            ваш проводник, основанный на фактах. Мы объективно оцениваем премиальные
            заведения по единому стандарту, чтобы ваше решение было основано на
            реальном уровне, а не на статусе.
          </p>
          <Link to="/catalog" className="promo-button">
            Посмотреть каталог
          </Link>
        </div>
        <div className="promo-image">
          <div className="image-overlay">
            <img src={placeholderImg} alt="Premium restaurant interior" />
          </div>
        </div>
      </div>
    </section>
  );
};