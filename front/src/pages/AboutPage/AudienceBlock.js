import React from "react";
import "./AudienceBlock.css";

const AudienceBlock = () => {
  return (
    <div className="audience-block">
      <h2 className="audience-title">Наша аудитория</h2>
      <h3 className="audience-subtitle">Мы создаём сервис для тех, кто:</h3>
      <p className="audience-text">
        • Выбирает премиальную гастрономию на основе верифицированных данных, а
        не случайных рекомендаций
        {"\n"}• Рассматривает рестораны как пространство для деловых и личных
        событий, где важен гарантированный уровень
        {"\n"}• Ценит профессиональную экспертизу выше субъективных впечатлений
      </p>
    </div>
  );
};

export default AudienceBlock;
