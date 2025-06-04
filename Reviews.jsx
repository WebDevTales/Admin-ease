import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import ReviewBanner from "../components/Reviews/ReviewBanner";
import ReviewStats from "../components/Reviews/ReviewStats";
import ProductReviews from "../components/Reviews/ProductReviews";
import ReviewAnalytics from "../components/Reviews/ReviewAnalytics";

const Reviews = () => {
  useEffect(() => {
    console.log("✅ Reviews Page Rendered");
    document.title = "Reviews - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
            <ReviewBanner />
            <ReviewStats />
            <ReviewAnalytics />
            <ProductReviews />
        </main>
      </div>
    </div>
  );
};

export default Reviews;
