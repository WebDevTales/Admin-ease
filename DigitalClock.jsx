import React, { useState, useEffect } from "react";
import { FiClock, FiCalendar, FiSun, FiMoon } from "react-icons/fi";
import "../../Styles/Profile/DigitalClock.css";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  const date = time.toLocaleDateString('en-US', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfYear = Math.floor(
    (time - new Date(time.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );

  const isDaytime = time.getHours() >= 6 && time.getHours() < 18;

  return (
    <div 
      className={`digital-clock ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="clock-header">
        <FiClock className="clock-icon" />
        <span>DIGITAL CLOCK</span>
        {isDaytime ? (
          <FiSun className="time-indicator" />
        ) : (
          <FiMoon className="time-indicator" />
        )}
      </div>
      
      <div className="time-container">
        <div className="time">
          {hours}:{minutes}<span className="seconds">:{seconds}</span>
        </div>
        <div className="ampm">{ampm}</div>
      </div>
      
      <div className="date">
        <FiCalendar className="calendar-icon" />
        {date}
      </div>
      
      <div className="additional-info">
        <div className="info-item">
          <span>Day of Year</span>
          <span className="info-value">{dayOfYear}</span>
        </div>
        <div className="info-item">
          <span>Timezone</span>
          <span className="info-value">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(time.getSeconds() / 59) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DigitalClock;