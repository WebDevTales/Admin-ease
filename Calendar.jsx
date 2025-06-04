import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import EventList from "../components/Calendar/EventList";
import EventInfoTiles from "../components/Calendar/EventInfoTiles";
import CalendarEvents from "../components/Calendar/CalendarEvents";
import CalendarGraphs from "../components/Calendar/CalendarGraphs";
import EventGuidelines from "../components/Calendar/EventGuidelines";

const Calendar = () => {
  useEffect(() => {
    console.log("✅ Calendar Page Rendered");
    document.title = "Calendar - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <CalendarHeader />
          <EventInfoTiles />
          <CalendarEvents />
          <CalendarGraphs />
          <EventList />
          <EventGuidelines />
        </main>
      </div>
    </div>
  );
};

export default Calendar;
