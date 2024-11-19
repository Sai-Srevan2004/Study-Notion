import React from "react";
import "./Common.css";

export default function Tab({ tabData, field, setField }) {
  return (
    <div className="tab-container">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`tab-button ${field === tab.type ? "active" : "inactive"}`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
