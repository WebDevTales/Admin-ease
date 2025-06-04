import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "../../styles/Contacts/ContactAnalytics.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ContactAnalytics = () => {
  // Dummy Contact Data (Employees & Buyers)
  const contactsData = [
    { id: 1, role: "Employee" },
    { id: 2, role: "Buyer" },
    { id: 3, role: "Employee" },
    { id: 4, role: "Buyer" },
    { id: 5, role: "Employee" },
  ];

  // Dummy Messages Data (Sent Per Day)
  const messagesData = [
    { id: 1, sender: "Admin", day: "Mon" },
    { id: 2, sender: "Employee", day: "Mon" },
    { id: 3, sender: "Buyer", day: "Tue" },
    { id: 4, sender: "Admin", day: "Wed" },
    { id: 5, sender: "Buyer", day: "Thu" },
    { id: 6, sender: "Employee", day: "Fri" },
    { id: 7, sender: "Buyer", day: "Sat" },
    { id: 8, sender: "Admin", day: "Sun" },
  ];

  // Count Employees & Buyers
  const employeeCount = contactsData.filter(contact => contact.role === "Employee").length;
  const buyerCount = contactsData.filter(contact => contact.role === "Buyer").length;

  // Pie Chart Data (Employees vs Buyers)
  const pieData = {
    labels: ["Employees", "Buyers"],
    datasets: [
      {
        data: [employeeCount, buyerCount],
        backgroundColor: ["#ff9f43", "#ffdd59"], // Mangoish gradient colors
        hoverBackgroundColor: ["#ff7b00", "#ffcc33"],
      },
    ],
  };

  // Group Messages by Day
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const messagesPerDay = days.map(day => messagesData.filter(msg => msg.day === day).length);

  // Bar Chart Data (Messages Sent Per Day)
  const barData = {
    labels: days,
    datasets: [
      {
        label: "Messages Sent",
        data: messagesPerDay,
        backgroundColor: "#ff9f43", // Mangoish orange
        hoverBackgroundColor: "#ff7b00",
      },
    ],
  };

  return (
    <div className="analytics-container">
      <div className="analytics-row">
        {/* Pie Chart */}
        <div className="chart">
          <h3>📊 Employees vs Buyers</h3>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="chart">
          <h3>📈 Messages Sent Per Day</h3>
          <Bar data={barData} />
        </div>

        {/* Messages Table */}
        <div className="table-container">
          <h3>📅 Messages Per Day</h3>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Messages Sent</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day, index) => (
                <tr key={index}>
                  <td>{day}</td>
                  <td>{messagesPerDay[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactAnalytics;
