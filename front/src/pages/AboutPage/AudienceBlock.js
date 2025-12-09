import React from "react";
import "./AudienceBlock.css";

const AudienceBlock = () => {
  return (
    <div className="audience-block">
      <h2 className="audience-title">Наша аудитория</h2>
      <h3 className="audience-subtitle">Мы создаём сервис для тех, кто:</h3>
      <ul className="audience-text">
        <li>
          • Выбирает премиальную гастрономию на основе верифицированных данных,
          а не случайных рекомендаций
        </li>
        <li>
          • Рассматривает рестораны как пространство для деловых и личных
          событий, где важен гарантированный уровень
        </li>
        <li>
          • Ценит профессиональную экспертизу выше субъективных впечатлений
        </li>
      </ul>
    </div>
  );
};

export default AudienceBlock;
