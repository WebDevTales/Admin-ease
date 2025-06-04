import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import OrdersStatus from "../components/Orders/ordersStatus";
import "../styles/dashboard.css";
import SalesCharts from "../components/Sales/SalesCharts";
import OrderManagement from "../components/Orders/OrderManagement";
import OrdersTimeline from "../components/Orders/OrdersTimeline";
import RecentOrders from "../components/Dashboard/RecentOrders";
import CalendarGraphs from "../components/Calendar/CalendarGraphs";
import ReviewAnalytics from "../components/Reviews/ReviewAnalytics";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <WelcomeBanner userName="Admin" />
            <OrdersStatus />
          <SalesCharts />
            <OrderManagement />
            <OrdersTimeline />
          <RecentOrders />
          <CalendarGraphs />
            <ReviewAnalytics />
        </main>
      </div>
    </div>
  );
}; 

export default Dashboard;
