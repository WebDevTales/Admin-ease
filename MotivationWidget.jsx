import React from 'react';
import '../../Styles/Profile/MotivationWidget.css';

const MotivationWidget = () => {
  const quotes = [
    "Progress is progress, no matter how small",
    "You're capable of more than you know",
    "Every expert was once a beginner",
    "Small steps every day lead to big results"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="motiv-widget-container">
      <div className="motiv-widget-header">
        <h3>Daily Motivation</h3>
        <span>✨</span>
      </div>
      <div className="motiv-widget-content">
        <p>{randomQuote}</p>
      </div>
    </div>
  );
};

export default MotivationWidget;