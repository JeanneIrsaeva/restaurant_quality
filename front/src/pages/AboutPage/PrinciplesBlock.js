import React from "react";
import PrincipleCard from "./../../components/PrincipleCard/PrincipleCard";
import principlesBackground from "./../../assets/icons/background_rectangle.svg";
import "./PrinciplesBlock.css";

const PrinciplesBlock = () => {
  return (
    <div className="principles-container">
      <div className="principles-wrapper">
        <h2 className="principles-title">Наши принципы</h2>

        <img
          src={principlesBackground}
          alt="Фон принципов"
          className="principles-background"
        />

        <div className="principles-grid">
          <PrincipleCard
            title="Осознанный подход"
            text="Мы уважаем труд рестораторов и объективно оцениваем их работу."
            style={{ position: "absolute", top: "205px", left: "180px" }}
          />
          <PrincipleCard
            title="Эволюция стандартов"
            text="Мы развиваемся вместе с индустрией, чтобы оставаться для вас актуальным источником информации."
            style={{ position: "absolute", top: "440px", left: "323px" }}
          />
          <PrincipleCard
            title="Профессиональная этика"
            text="Мы уважаем труд рестораторов и объективно оцениваем их работу."
            style={{ position: "absolute", top: "235px", left: "684px" }}
          />
          <PrincipleCard
            title="Беспристрастность"
            text="Никаких предпочтений и договорённостей — только факты."
            style={{ position: "absolute", top: "430px", left: "975px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrinciplesBlock;
