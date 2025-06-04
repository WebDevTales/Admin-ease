import React from 'react';
import '../../Styles/Profile/WeatherWidget.css';

const WeatherWidget = () => {
  return (
    <div className="weather-widget-container">
      <div className="weather-widget-header">
        <h3>Current Weather</h3>
        <span>🌤️</span>
      </div>
      <div className="weather-widget-main">
        <div className="weather-widget-temp">72°F</div>
        <div className="weather-widget-desc">Partly Cloudy</div>
      </div>
      <div className="weather-widget-details">
        <div className="weather-widget-detail">
          <span>Humidity</span>
          <span>65%</span>
        </div>
        <div className="weather-widget-detail">
          <span>Wind</span>
          <span>8 mph</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;