import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader"; // Animated loader
import "../styles/Sales.css";

const Sales = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Sales Stats - Admin Dashboard";

    // Simulate page loading effect
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="sales-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="sales-content">
            <Sidebar />
            <main className="main-content">
              <h1 className="page-title">📊 Sales Statistics</h1>

              {/* Quick Stats Section */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Sales</h3>
                  <p>$120,500</p>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <p>$450,000</p>
                </div>
                <div className="stat-card">
                  <h3>Orders</h3>
                  <p>3,450</p>
                </div>
                <div className="stat-card">
                  <h3>New Customers</h3>
                  <p>1,290</p>
                </div>
              </div>

              {/* Sales Performance Section */}
              <div className="performance-section">
                <h2>Performance & Goals</h2>
                <div className="progress-bar">
                  <div className="bar" style={{ width: "75%" }}>
                    75% Sales Target
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="bar" style={{ width: "60%" }}>
                    60% Revenue Goal
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="bar" style={{ width: "85%" }}>
                    85% Customer Growth
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="recent-orders">
                <h2>Recent Transactions</h2>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1001</td>
                      <td>John Doe</td>
                      <td>$250</td>
                      <td className="status completed">Completed</td>
                    </tr>
                    <tr>
                      <td>#1002</td>
                      <td>Sarah Lee</td>
                      <td>$180</td>
                      <td className="status pending">Pending</td>
                    </tr>
                    <tr>
                      <td>#1003</td>
                      <td>Michael Smith</td>
                      <td>$320</td>
                      <td className="status cancelled">Cancelled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Sales;
