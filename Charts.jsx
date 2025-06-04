import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import ChartsWelcomeBanner from "../components/Charts/ChartsWelcomeBanner";
import ProductStats from "../components/Products/ProductStats";
import SalesCharts from "../components/Sales/SalesCharts";
import OrdersCharts from "../components/Orders/OrdersCharts";
import SalesChart from "../components/Sales/SalesReview";

const Charts = () => {
  useEffect(() => {
    console.log("✅ Charts Page Rendered");
    document.title = "Charts - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <ChartsWelcomeBanner />
          <ProductStats />
          <SalesCharts />
          <OrdersCharts />
          <SalesChart />
        </main>
      </div>
    </div>
  );
};

export default Charts;
