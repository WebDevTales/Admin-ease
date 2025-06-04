import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import FAQSContent from "../components/FAQS/faqscontent";

const FAQ = () => {
  useEffect(() => {
    console.log("✅ FAQ Page Rendered");
    document.title = "FAQ - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <FAQSContent />
        </main>
      </div>
    </div>
  );
};

export default FAQ;
