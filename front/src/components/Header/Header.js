import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/svg/logo.svg" alt="CityGuide" className="logo-img" />
                    </Link>
                </div>

                <nav className="nav">
                    <Link to="/" className="nav-link">Главная</Link>
                    <Link to="/catalog" className="nav-link">Каталог</Link>
                    <Link to="/venue" className="nav-link">О нас</Link>
                </nav>

                <div className="cart">
                    <Link to="/favorites" className="nav-link">
                        <img src="/assets/svg/cart.svg" alt="Корзина" className="cart-icon" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;