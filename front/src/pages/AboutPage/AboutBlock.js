import React from "react";
import aboutImage from "./../../assets/icons/AboutUs.jpg";
import "./AboutBlock.css";

const AboutBlock = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">О нас</h2>

            <p>
              В основе Verve — стремление внести ясность и точность в мир
              высокой гастрономии. Мы заметили, что даже в премиальном сегменте
              не хватает объективных ориентиров для выбора, и создали сервис,
              который помогает принимать решения на основе проверенных данных, а
              не случайных впечатлений.
            </p>

            <p>
              Наша команда объединила глубокое понимание гастрономической
              индустрии с технологическими решениями, чтобы разработать
              методологию, которая превращает субъективные впечатления в
              структурированную оценку.
            </p>

            <p>
              Наша цель — стать вашим надежным проводником в выборе заведений,
              где каждая рекомендация основана на тщательном анализе и четких
              критериях.
            </p>
          </div>

          <div className="about-image">
            <img src={aboutImage} alt="О нас" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
