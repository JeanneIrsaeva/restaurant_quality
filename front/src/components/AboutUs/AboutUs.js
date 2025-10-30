import React from "react";
import AboutUsImg from './../../img/AboutUs.jpg'
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <section className="aboutus-section">
      <h2 className="aboutus-title">О нас</h2>
      
      <div className="aboutus-content">
        <div className="aboutus-text">
          <p className="aboutus-description">
            Мы создали исчерпывающую систему оценки, где каждое заключение основано на единых критериях, а не на личном впечатлении. 
            Наша цель — установить новые стандарты достоверности в премиальной гастрономии, предоставляя вам анализ, очищенный от субъективности.
            <br />
            Мы формируем пул профильных экспертов, каждый из которых работает в соответствии с утверждённым протоколом. 
            Ваше доверие к выбору — следствие методологии, а не частного мнения.
          </p>
        </div>
        <div className="aboutus-image">
          <img src={AboutUsImg} alt="AboutUs" />
        </div>
      </div>
    </section>
  );
};