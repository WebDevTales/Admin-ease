import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InvoiceWelcomeBanner from "../components/Invoices/InvoiceWelcomeBanner";
import InvoicesTable from "../components/Invoices/InvoicesTable";
import InvoicesCharts from "../components/Invoices/InvoicesCharts";
import InvoiceSummary from "../components/Invoices/InvoiceSummary";
import "../styles/sales.css";

const Invoices = () => {
  useEffect(() => {
    console.log("✅ Invoices Page Rendered");
    document.title = "Invoices - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <InvoiceWelcomeBanner />
          <InvoiceSummary />
          <InvoicesTable />
          <InvoicesCharts />
        </main>
      </div>
    </div>
  );
};

export default Invoices;
