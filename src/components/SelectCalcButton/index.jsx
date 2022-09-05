import React from "react";
import "./select-calc-button.css";

function SelectCalcButton({ isActive, onClick }) {
  return (
    <div className="control">
      <button
        onClick={onClick}
        className={`select-button button is-large ${
          isActive ? "is-active" : ""
        }`}
      >
        {isActive ? (
          <span>
            <i className="fas fa-check" />
          </span>
        ) : (
          <div className="select-button-circle" />
        )}
      </button>
    </div>
  );
}

export default SelectCalcButton;
