import React from "react";
import "./PrincipleCard.css";

const PrincipleCard = ({ title, text, style }) => {
  return (
    <div className="principle-card" style={style}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default PrincipleCard;
