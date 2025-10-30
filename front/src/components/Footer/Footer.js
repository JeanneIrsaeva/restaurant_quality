import React from "react";
import "./Footer.css";
import logoImg from './../../img/icons/logo.svg'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-nav">
        <div className="footer-nav-item">Главная</div>
        <div className="footer-nav-item">Каталог</div>
        <div className="footer-nav-item">О нас</div>
      </div>
      
      <div className="footer-logo">
        <img src={logoImg} alt="Logo" className="footer-logo-img" />
      </div>
      
      <div className="footer-contact">exampleaddress@mail.ru</div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">© Velve 2024. Все права защищены.</p>
        <div className="footer-privacy">Политика конфиденциальности</div>
      </div>
    </footer>
  );
};