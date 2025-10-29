import React, { useState } from "react";
import "./FAQ.css";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const faqItems = [
    {
      question: "Чем ваш сервис отличается от ресторанных блогеров и платформ вроде TripAdvisor?",
      answer: null
    },
    {
      question: "Кто ваши эксперты и как вы их отбираете?",
      answer: null
    },
    {
      question: "Мое заведение хочет пройти оценку. Как это сделать?",
      answer: "Заполните форму заявки в разделе «О нас». Наша команда свяжется с вами для обсуждения деталей экспертизы в течение 7 рабочих дней."
    },
    {
      question: "Вы оцениваете только рестораны?",
      answer: null
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-title">FAQs</div>

      {faqItems.map((item, index) => (
        <div key={index} className="faq-item-wrapper">
          <div 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <p className="faq-question">{item.question}</p>
            <div className="faq-arrow">
              <span className={`arrow-icon ${activeIndex === index ? 'rotated' : ''}`}>
                ▼
              </span>
            </div>
          </div>
          
          {activeIndex === index && item.answer && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};