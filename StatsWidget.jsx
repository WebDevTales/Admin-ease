import React from 'react';
import '../../Styles/Profile/StatsWidget.css';

const StatsWidget = () => {
  return (
    <div className="stats-widget-container">
      <h3 className="stats-widget-title">Quick Stats</h3>
      <div className="stats-widget-grid">
        <div className="stats-widget-item">
          <span className="stats-widget-number">24</span>
          <span className="stats-widget-label">Tasks</span>
        </div>
        <div className="stats-widget-item">
          <span className="stats-widget-number">18</span>
          <span className="stats-widget-label">Completed</span>
        </div>
        <div className="stats-widget-item">
          <span className="stats-widget-number">6</span>
          <span className="stats-widget-label">Pending</span>
        </div>
        <div className="stats-widget-item">
          <span className="stats-widget-number">75%</span>
          <span className="stats-widget-label">Progress</span>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;