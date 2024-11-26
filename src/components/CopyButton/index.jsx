import React, { useState, useEffect } from "react";
import "./copy-button.css";

function CopyButton({ value }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleClick() {
    const cleanValue = value.replace(/[^0-9$.]/g, "");

    navigator.clipboard.writeText(cleanValue).then(() => {});
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  useEffect(() => {
    setIsCopied(false);
  }, [value]);

  if (!value) {
    return null;
  }

  return (
    <button
      className={`copy-button ${isCopied && "is-copied"}`}
      type="button"
      onClick={handleClick}
      tabIndex={-1}
    >
      <span className="icon is-medium">
        <i className="fa-solid fa-circle-check" hidden={!isCopied} />
        <i className="fa-regular fa-copy" hidden={isCopied} />
      </span>
    </button>
  );
}

CopyButton.propTypes = {};

export default CopyButton;
