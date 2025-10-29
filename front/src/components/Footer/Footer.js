import React from "react";
import "./Footer.css";

export const Footer = ({
  className = "",
  vectorVector = "/images/vector-1-2.svg",
  line = "/images/line-1.svg",
}) => {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer-nav">
        <div className="footer-nav-item">Главная</div>
        <div className="footer-nav-item">Каталог</div>
        <div className="footer-nav-item">О нас</div>
      </div>
      
      <div className="footer-logo">
        <img src={vectorVector} alt="Verve Logo" className="footer-logo-img" />
      </div>
      
      <div className="footer-contact">exampleaddress@mail.ru</div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">© Velve 2024. Все права защищены.</p>
        <div className="footer-privacy">Политика конфиденциальности</div>
      </div>
      
      <img className="footer-divider" alt="Line" src={line} />
    </footer>
  );
};