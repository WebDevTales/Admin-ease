import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OrdersWelcomeBanner from "../components/Orders/OrdersWelcomeBanner";
import OrderManagement from "../components/Orders/OrderManagement";
import OrdersStatus from "../components/Orders/ordersStatus";
import OrdersCharts from "../components/Orders/OrdersCharts";
import OrdersTimeline from "../components/Orders/OrdersTimeline";
import RecentOrders from "../components/Dashboard/RecentOrders";
import ShippingMethods from "../styles/Products/ShippingMethods";
import OrdersInstructions from "../components/Orders/OrdersInstructions";
import "../styles/sales.css";

const Orders = () => {
  useEffect(() => {
    console.log("✅ Orders Page Rendered");
    document.title = "Orders - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
            <OrdersWelcomeBanner />
            <OrdersStatus />
            <OrderManagement />
            <OrdersCharts />
            <OrdersTimeline />
            <RecentOrders />
            <ShippingMethods />
            <OrdersInstructions />
        </main>
      </div>
    </div>
  );
};

export default Orders;
