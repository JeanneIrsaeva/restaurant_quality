import React from "react";
import "./PrincipleCard.css";

const PrincipleCard = ({ title, text }) => {
  return (
    <div className="principle-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default PrincipleCard;
