import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/sales.css";
import ProductManager from "../components/Products/ProductManager";
import InvoiceWelcomeBanner from "../components/Invoices/InvoiceWelcomeBanner";
import ReviewList from "../components/Products/ReviewList";
import ShippingMethods from "../styles/Products/ShippingMethods";
import RecentOrders from "../components/Dashboard/RecentOrders";
import ProductStats from "../components/Products/ProductStats";

const Products = () => {
  useEffect(() => {
    console.log("✅ Products Page Rendered");
    document.title = "Products - Admin Dashboard";
  }, []);

  return (
    <div className="sales-container">
      <Navbar />
      <div className="sales-content">
        <Sidebar />
        <main className="main-content">
          <InvoiceWelcomeBanner />
          <ProductManager />
          <ProductStats />
          <ReviewList />
          <ShippingMethods />
          <RecentOrders />
        </main>
      </div>
    </div>
  );
};

export default Products;
