import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import AdminGuide from "../components/Admin Guide/AdminGuide";

const UserGuide = () => {
  useEffect(() => {
    console.log("✅ User Guide Page Rendered");
    document.title = "User Guide - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <AdminGuide />
        </main>
      </div>
    </div>
  );
};

export default UserGuide;
