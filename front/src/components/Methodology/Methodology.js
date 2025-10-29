import React from "react";
import "./Methodology.css";

export const Methodology = () => {
  const methodologyItems = [
    {
      title: "12 критериев",
      description: "Каждое заведение оценивается по единому чек-листу. Итоговая оценка складывается из объективных параметров, а не личных впечатлений.",
      position: { left: "980px", top: "90px" }
    },
    {
      title: "Анонимный визит",
      description: "Наши эксперты — анонимные гости. Мы видим только реальный уровень сервиса, без парадных приемов.",
      position: { left: "675px", top: "90px" }
    },
    {
      title: "Прозрачность",
      description: "Принимаем оплату за проведение оценки и размещение. Это не влияет на рейтинг — он формируется строго по критериям.",
      position: { left: "980px", top: "319px" }
    },
    {
      title: "Назначение эксперта",
      description: "Для каждого заведения мы подбираем независимого критика. Это исключает личные связи и предвзятость на этапе оценки.",
      position: { left: "675px", top: "319px" }
    }
  ];

  return (
    <section className="methodology-section">
      <div className="methodology-title">Методология</div>

      <p className="methodology-description">
        Наша методология — это протокол, превращающий гастрономический опыт в
        структурированные данные. Прозрачность и системность — основа нашего
        доверия.
      </p>

      {methodologyItems.map((item, index) => (
        <div 
          key={index}
          className="methodology-item"
          style={{ left: item.position.left, top: item.position.top }}
        >
          <div className="methodology-item-title">{item.title}</div>
          <p className="methodology-item-description">{item.description}</p>
        </div>
      ))}
    </section>
  );
};