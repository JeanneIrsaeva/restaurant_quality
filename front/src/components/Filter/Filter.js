import React, { useState } from "react";
import "./Filter.css";
import StarIcon from "../../assets/icons/icon-star.svg";

export const Filter = ({ filters, onChange }) => {
  const initialSelected = {};
  Object.keys(filters).forEach((cat) => (initialSelected[cat] = new Set()));
  const [selected, setSelected] = useState(initialSelected);

  const handleToggle = (category, value) => {
    const updated = new Set(selected[category]);
    if (updated.has(value)) updated.delete(value);
    else updated.add(value);
    const newState = { ...selected, [category]: updated };
    setSelected(newState);
    onChange(newState);
  };

  const renderCheckbox = (category, value, isStars = false) => (
    <label className="filter-option" key={value}>
      <input
        type="checkbox"
        checked={selected[category].has(value)}
        onChange={() => handleToggle(category, value)}
      />
      {isStars ? (
        <span className="filter-stars">
          {Array.from({ length: value }).map((_, idx) => (
            <img key={idx} src={StarIcon} alt="звезда" className="star-icon" />
          ))}
        </span>
      ) : (
        <span>{value}</span>
      )}
    </label>
  );

  const renderTag = (category, value) => (
    <button
      className={`tag-btn ${selected[category].has(value) ? "active" : ""}`}
      key={value}
      onClick={() => handleToggle(category, value)}
    >
      {value}
    </button>
  );

  return (
    <aside className="sidebar">
      {Object.keys(filters).map((cat) => (
        <div className="filter-block" key={cat}>
          <div className="filter-title">{cat}</div>
          <div className={`filter-box ${cat === "Рейтинг" || cat === "Страна" ? "column" : "row"}`}>
            {cat === "Рейтинг" || cat === "Страна" || cat === "Тип заведения"
              ? filters[cat].map((val) => renderCheckbox(cat, val, cat === "Рейтинг"))
              : cat === "Тэги"
              ? filters[cat].map((val) => renderTag(cat, val))
              : null}
          </div>
        </div>
      ))}
    </aside>
  );
};
