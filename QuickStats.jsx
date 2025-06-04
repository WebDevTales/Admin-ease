import React from "react";
import { FaShoppingCart, FaDollarSign, FaUsers, FaChartLine } from "react-icons/fa";
import "../../styles/Dashboard/quickStats.css";


const QuickStats = () => {
  const stats = [
    { icon: <FaShoppingCart />, label: "Total Orders", value: "1,532", color: "#ff6699" },
    { icon: <FaDollarSign />, label: "Revenue", value: "$47,890", color: "#ffcc70" },
    { icon: <FaUsers />, label: "Users", value: "8,245", color: "#36cfc9" },
    { icon: <FaChartLine />, label: "Sales Growth", value: "12.5%", color: "#5a67d8" },
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index} style={{ borderBottom: `4px solid ${stat.color}` }}>
          <div className="stat-icon" style={{ backgroundColor: stat.color + "22" }}>
            {stat.icon}
          </div>
          <div className="stat-info">
            <h3 className="stat-value" style={{ color: stat.color }}>{stat.value}</h3>
            <p className="stat-label" style={{ color: "#333" }}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
