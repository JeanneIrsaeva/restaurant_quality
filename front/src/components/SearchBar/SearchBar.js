import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ onSearch, placeholder = "Ищите интересующее вас заведение" }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length === 0) {
      onSearch(""); // очистка результатов
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        minLength={2}
      />
      <button type="submit" className="search-button">
        <img src="/assets/svg/searchIcon.svg" alt="Поиск" className="search-icon" />
      </button>
    </form>
  );
};