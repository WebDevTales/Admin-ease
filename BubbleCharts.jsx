import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import ProductCustomerBubbleChart from "../components/BubbleCharts/ProductCustomerBubbleChart";
import MarketingROIBubbleChart from "../components/BubbleCharts/MarketingROIBubbleChart";
import SupplierRegionBubbleChart from "../components/BubbleCharts/SupplierRegionBubbleChart";
import SeasonalReturnsBubbleChart from "../components/BubbleCharts/SeasonalReturnsBubbleChart";

const GeoCharts = () => {
  useEffect(() => {
    console.log("✅ Geo Charts Page Rendered");
    document.title = "Geo Charts - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <ProductCustomerBubbleChart />
          <MarketingROIBubbleChart />
          <SupplierRegionBubbleChart />
          <SeasonalReturnsBubbleChart />
        </main>
      </div>
    </div>
  );
};

export default GeoCharts;
