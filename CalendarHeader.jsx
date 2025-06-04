import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaBullhorn, FaChartLine } from "react-icons/fa";
import "../../styles/Calendar/CalendarHeader.css";

const MonthYearNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to go to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Function to go to the next month
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Live date and time
  const [liveDateTime, setLiveDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Format the live date and time
  const formattedLiveDate = liveDateTime.toLocaleString("default", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedLiveTime = liveDateTime.toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Format the current month and year
  const formattedDate = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="month-year-navigation-container">
      

      {/* Live Date and Time Section */}
      <div className="live-date-time">
      <FaCalendarAlt className="heading-icon" />
        <p className="live-date">{formattedLiveDate}</p>
        <p className="live-time">{formattedLiveTime}</p>
      </div>

      {/* Navigation Controls */}
      <div className="navigation-controls">
        <button className="nav-button" onClick={handlePreviousMonth}>
          <FaChevronLeft />
        </button>
        <h2 className="current-month-year">{formattedDate}</h2>
        <button className="nav-button" onClick={handleNextMonth}>
          <FaChevronRight />
        </button>
      </div>

      
    </div>
  );
};

export default MonthYearNavigation;