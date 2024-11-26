import React from "react";
import "./clear-button.css";

function ClearButton({ onClick, inputValue }) {
  if (inputValue === 0 || inputValue === "") {
    return null;
  }

  return (
    <button
      className="clear-button button is-light is-medium is-rounded"
      onClick={onClick}
      tabIndex={-1}
    >
      <span className="icon is-medium">
        <i className="fas fa-close"></i>
      </span>
    </button>
  );
}

ClearButton.propTypes = {};

export default ClearButton;
