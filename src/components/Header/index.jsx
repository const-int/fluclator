import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-grid">
          <i className="fas fa-calculator header-icon"></i>
          <span>Asset Price Change Calculator</span>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
