import React from "react";
<<<<<<< HEAD
// import aboutImage from "./../../img/AboutUs.jpg";
=======
import aboutImage from "./../../assets/icons/AboutUs.jpg";
>>>>>>> feature/US-9
import "./AboutBlock.css";

const AboutBlock = () => {
  return (
    <div className="about-container-border">
      <div className="about-container">
        <section className="about-block">
          <div className="about-text">
            <h1>О нас</h1>
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

<<<<<<< HEAD
        <div className="about-image">
          <img src="/assets/images/AboutUs.jpg" alt="О нас" />
        </div>
      </section>
=======
          <div className="about-image">
            <img src={aboutImage} alt="О нас" />
          </div>
        </section>
      </div>
>>>>>>> feature/US-9
    </div>
  );
};

export default AboutBlock;
