import React from "react";
import "./percent-sign.css";

function PercentSign({ value }) {
  return (
    <div className="percent-sign" style={{ left: 0 }}>
      <div className="percent-sign__hidden-value">{value}</div>%
    </div>
  );
}

export default PercentSign;
