import "./Header.css";
import logoImg from './../../img/icons/logo.svg'
import likeImg from './../../img/icons/like.svg'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoImg} alt="Logo" />
      </div>
      <nav className="header-nav">
        <div className="nav-item">Главная</div>
        <div className="nav-item">Каталог</div>
        <div className="nav-item">О нас</div>
      </nav>
      <div className="header-like">
        <div className="like-icon">
          <img src={likeImg} alt="like" />
        </div>
      </div>
    </header>
  );
};