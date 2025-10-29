import React from "react";
import "./Contact.css";

export const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-title">Any other questions?</div>

      <p className="contact-description">
        We are ready to talk in detail about cooperation and answer any of your questions.
        Use email to contact us:
      </p>

      <a href="mailto:partner@verve.ru" className="contact-email">
        partner@verve.ru
      </a>
    </section>
  );
};