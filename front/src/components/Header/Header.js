import "./Header.css";
import logoImg from "./../../img/icons/logo.svg";
import likeImg from "./../../img/icons/like.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoImg} alt="Logo" />
      </div>
      <nav className="header-nav">
        <Link className="nav-item" to="/">
          Главная
        </Link>
        <Link className="nav-item" to="/catalog">
          Каталог
        </Link>
        <Link className="nav-item" to="/about">
          О нас
        </Link>
      </nav>
      <div className="header-like">
        <div className="like-icon">
          <img src={likeImg} alt="like" />
        </div>
      </div>
    </header>
  );
};
