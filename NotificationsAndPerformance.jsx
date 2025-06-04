import React from "react";
import "../../styles/Dashboard/NotificationsAndPerformance.css";
import { FaBox, FaMoneyBillWave, FaChartLine, FaUserPlus, FaTruck } from "react-icons/fa"; // Icons

const NotificationsAndPerformance = () => {
  // 🔔 **Notifications Data**
  const notifications = [
    { id: 1, message: "New order received: #1045", time: "5 min ago", icon: <FaBox className="notif-icon order" /> },
    { id: 2, message: "Payment of $250 completed", time: "20 min ago", icon: <FaMoneyBillWave className="notif-icon payment" /> },
    { id: 3, message: "Stock update: 5 items left in inventory", time: "1 hr ago", icon: <FaChartLine className="notif-icon stock" /> },
    { id: 4, message: "New user registered: Emily Davis", time: "2 hrs ago", icon: <FaUserPlus className="notif-icon user" /> },
    { id: 5, message: "Shipment #9876 delivered", time: "3 hrs ago", icon: <FaTruck className="notif-icon delivery" /> },
    { id: 6, message: "Refund request: Order #1023", time: "4 hrs ago", icon: <FaMoneyBillWave className="notif-icon refund" /> },
    { id: 7, message: "VIP Customer joined: John Doe", time: "6 hrs ago", icon: <FaUserPlus className="notif-icon vip" /> },
  ];

  // 📊 **Performance Progress Data**
  const performanceData = [
    { title: "Monthly Sales", percentage: 75, color: "linear-gradient(90deg, #4CAF50, #8BC34A)" },
    { title: "Revenue Growth", percentage: 60, color: "linear-gradient(90deg, #FF9800, #FFB74D)" },
    { title: "Customer Satisfaction", percentage: 85, color: "linear-gradient(90deg, #2196F3, #64B5F6)" },
    { title: "Product Returns", percentage: 20, color: "linear-gradient(90deg, #F44336, #FFCDD2)" },
    { title: "New Customers", percentage: 90, color: "linear-gradient(90deg, #9C27B0, #E040FB)" } // New metric added
];


  return (
    <div className="notifications-performance-container">
      {/* 🔔 Notifications Panel (Scrollable) */}
      <div className="notifications-panel">
        <h3>🔔 Latest Updates</h3>
        <div className="notifications-list-container">
          <ul className="notifications-list">
            {notifications.map((notif) => (
              <li key={notif.id} className="notification-item">
                {notif.icon}
                <div className="notif-text">
                  <span className="notif-message">{notif.message}</span>
                  <span className="notif-time">{notif.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 📊 Performance Progress Bars */}
      <div className="performance-panel">
        <h3>📊 Sales & Performance</h3>
        {performanceData.map((item, index) => (
          <div key={index} className="progress-bar-container">
            <span className="progress-label">{item.title}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${item.percentage}%`, background: item.color }}
              >
                <span className="progress-percentage">{item.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsAndPerformance;
