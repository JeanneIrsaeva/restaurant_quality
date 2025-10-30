import React from "react";
import "./Contact.css";

export const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-title">Остались вопросы?</div>

      <p className="contact-description">
        Мы готовы подробно рассказать о сотрудничестве и ответить 
        на любые ваши вопросы. Для связи используйте электронную почту:
      </p>

      <a href="mailto:partner@verve.ru" className="contact-email">
        partner@verve.ru
      </a>
    </section>
  );
};