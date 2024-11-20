import React from 'react';
import './AboutPage.css';

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {Stats.map((data, index) => (
            <div key={index} className="stats-card">
              <h1 className="stats-count">{data.count}</h1>
              <h2 className="stats-label">{data.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
