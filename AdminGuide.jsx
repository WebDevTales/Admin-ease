import React from "react";
import "../../styles/AdminGuide/AdminGuide.css";
import { FaChartBar, FaBoxOpen, FaCalendarAlt, FaUsers, FaFileInvoice, FaMapMarkedAlt, FaChartLine, FaCogs } from "react-icons/fa";

// Color scheme for different sections
const colorSchemes = [
  { border: "#FF6B6B", icon: "#FF6B6B", text: "#FF6B6B" }, // Red
  { border: "#4ECDC4", icon: "#4ECDC4", text: "#4ECDC4" }, // Teal
  { border: "#45B7D1", icon: "#45B7D1", text: "#45B7D1" }, // Blue
  { border: "#FFA07A", icon: "#FFA07A", text: "#FFA07A" }, // Salmon
  { border: "#98D8C8", icon: "#98D8C8", text: "#98D8C8" }, // Mint
  { border: "#F06292", icon: "#F06292", text: "#F06292" }, // Pink
  { border: "#7986CB", icon: "#7986CB", text: "#7986CB" }, // Lavender
  { border: "#9575CD", icon: "#9575CD", text: "#9575CD" }, // Purple
  { border: "#64B5F6", icon: "#64B5F6", text: "#64B5F6" }, // Light Blue
  { border: "#4DB6AC", icon: "#4DB6AC", text: "#4DB6AC" }, // Aqua
  { border: "#81C784", icon: "#81C784", text: "#81C784" }, // Green
  { border: "#FFD54F", icon: "#FFD54F", text: "#FFD54F" }, // Yellow
  { border: "#FF8A65", icon: "#FF8A65", text: "#FF8A65" }, // Orange
  { border: "#A1887F", icon: "#A1887F", text: "#A1887F" }, // Brown
  { border: "#90A4AE", icon: "#90A4AE", text: "#90A4AE" }, // Grey
];

const AdminGuide = () => {
  return (
    <div className="admin-guide">
      <h2>Admin Guide</h2>
      <p>This guide explains the key features of the Admin Panel, helping you manage your business efficiently.</p>

      {/* Dashboard Section */}
      <div className="guide-section">
        <h2>Dashboard Overview</h2>
        <p>The dashboard provides a quick overview of all key functionalities available to the admin.</p>

        <div className="guide-box" style={{ "--border-color": colorSchemes[0].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[0].icon }}>
            <FaChartLine style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[0].text }}>Real-Time Insights</h3>
          <p>Monitor live updates on sales, users, and system performance at a glance.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[1].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[1].icon }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[1].text }}>User Management</h3>
          <p>Manage different roles (Admin, Editor, Viewer) and their permissions efficiently.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[2].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[2].icon }}>
            <FaCogs style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[2].text }}>Customization</h3>
          <p>Modify widgets, set themes, and adjust system settings for a personalized experience.</p>
        </div>
      </div>

      {/* Sales Stats Section */}
      <div className="guide-section">
        <h2>Sales Stats</h2>
        <p>Monitor revenue, customer activity, and financial growth using sales statistics.</p>

        <div className="guide-box" style={{ "--border-color": colorSchemes[3].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[3].icon }}>
            <FaChartBar style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[3].text }}>Revenue Tracking</h3>
          <p>Track daily, weekly, and monthly revenue reports.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[4].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[4].icon }}>
            <FaBoxOpen style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[4].text }}>Product Sales</h3>
          <p>Analyze which products are selling the most and adjust strategies accordingly.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[5].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[5].icon }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[5].text }}>Customer Insights</h3>
          <p>View purchase behavior and engagement to optimize sales tactics.</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="guide-section">
        <h2>Products Management</h2>
        <p>Manage inventory, pricing, and stock availability efficiently.</p>

        <div className="guide-box" style={{ "--border-color": colorSchemes[6].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[6].icon }}>
            <FaBoxOpen style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[6].text }}>Add New Products</h3>
          <p>Easily add new products with images, descriptions, and pricing.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[7].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[7].icon }}>
            <FaCogs style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[7].text }}>Inventory Updates</h3>
          <p>Manage stock levels and receive alerts for low inventory.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[8].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[8].icon }}>
            <FaChartBar style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[8].text }}>Sales Performance</h3>
          <p>Track best-selling products and adjust marketing strategies.</p>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="guide-section">
        <h2>Contacts Management</h2>
        <p>Efficiently store and manage contact information.</p>

        <div className="guide-box" style={{ "--border-color": colorSchemes[9].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[9].icon }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[9].text }}>Add New Contacts</h3>
          <p>Admins can add contacts with details like name, phone, and email.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[10].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[10].icon }}>
            <FaCogs style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[10].text }}>Edit Contact Details</h3>
          <p>Update or modify contact details and assigned responsibilities.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[11].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[11].icon }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[11].text }}>Search & Filter</h3>
          <p>Find contacts easily based on role, name, or department.</p>
        </div>
      </div>

      {/* Invoices Section */}
      <div className="guide-section">
        <h2>Invoices & Billing</h2>
        <p>Keep track of invoices, transactions, and payments.</p>

        <div className="guide-box" style={{ "--border-color": colorSchemes[12].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[12].icon }}>
            <FaFileInvoice style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[12].text }}>Generate Invoices</h3>
          <p>Create invoices for customer purchases with a single click.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[13].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[13].icon }}>
            <FaChartBar style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[13].text }}>Payment Tracking</h3>
          <p>Monitor pending and completed transactions effortlessly.</p>
        </div>

        <div className="guide-box" style={{ "--border-color": colorSchemes[14].border }}>
          <div className="icon-circle" style={{ background: colorSchemes[0].icon }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <h3 style={{ color: colorSchemes[0].text }}>Automated Reminders</h3>
          <p>Send reminders for unpaid invoices automatically.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminGuide;