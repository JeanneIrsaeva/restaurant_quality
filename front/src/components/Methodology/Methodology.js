import React from "react";
import "./Methodology.css";

export const Methodology = () => {
  const methodologyItems = [
    {
      title: "Анонимный визит",
      description: "Наши эксперты — анонимные гости. Мы видим только реальный уровень сервиса, без парадных приемов."
    },
    {
      title: "12 критериев",
      description: "Каждое заведение оценивается по единому чек-листу. Итоговая оценка складывается из объективных параметров, а не личных впечатлений."
    },
    {
      title: "Назначение эксперта",
      description: "Для каждого заведения мы подбираем независимого критика. Это исключает личные связи и предвзятость на этапе оценки."
    },
    {
      title: "Прозрачность",
      description: "Принимаем оплату за проведение оценки и размещение. Это не влияет на рейтинг — он формируется строго по критериям."
    }
  ];

  return (
    <section className="methodology-section">
      <div className="methodology-content">
        <div className="methodology-text">
          <h2 className="methodology-title">Методология</h2>
          <p className="methodology-description">
            Наша методология — это протокол, превращающий гастрономический опыт в
            структурированные данные. Прозрачность и системность — основа нашего
            доверия.
          </p>
        </div>

        <div className="methodology-grid">
          {methodologyItems.map((item, index) => (
            <div key={index} className="methodology-item">
              <div className="methodology-item-title">{item.title}</div>
              <p className="methodology-item-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};