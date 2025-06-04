import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InfoTiles from "../components/Sales/InfoTiles";  
import SalesCharts from "../components/Sales/SalesCharts";
import SalesChart from "../components/Sales/SalesReview";
import BestSellingProducts from "../components/Sales/BestSellingProducts";
import SalesComparisonDemographics from "../components/Sales/SalesComparisonDemographics";
import SalesCarousel from "../components/Sales/SalesCarousel";
import SalesProgressAlerts from "../components/Sales/SalesProgressAlerts";
import SalesInfoComponent from "../components/Sales/SalesInfoComponent";
import "../styles/sales.css";

const Sales = () => {
  useEffect(() => {
    console.log("✅ Sales Page Rendered");
    document.title = "Sales Stats - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <InfoTiles />
          <SalesCharts />
          <SalesChart />
          <BestSellingProducts />
          <SalesComparisonDemographics />
          <SalesCarousel />
          <SalesProgressAlerts />
          <SalesInfoComponent />
        </main>
      </div>
    </div>
  );
};

export default Sales;
