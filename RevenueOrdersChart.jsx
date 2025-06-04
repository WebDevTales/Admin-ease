import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../../styles/Dashboard/RevenueOrdersChart.css";

Chart.register(...registerables);

const RevenueOrdersChart = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // 📊 **Bar Chart Data (Revenue & Orders)**
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 3000, 5000, 2400, 3100],
        backgroundColor: "#36A2EB",
        borderRadius: 8,
      },
      {
        label: "Orders",
        data: [80, 120, 150, 180, 220, 260],
        backgroundColor: "#FF6384",
        borderRadius: 8,
      },
    ],
  };

  // 📈 **Line Chart Data (Revenue & Orders)**
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 3000, 5000, 2400, 3100],
        borderColor: "#36A2EB",
        borderWidth: 2,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#36A2EB",
        tension: 0.4,
      },
      {
        label: "Orders",
        data: [80, 120, 150, 180, 220, 260],
        borderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#FF6384",
        tension: 0.4,
      },
    ],
  };

  // 📌 **Chart Options**
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="revenue-orders-container">
      {/* 📊 Revenue & Orders (Bar Chart) */}
      <div className="chart-box">
        <h3>📊 Revenue & Orders (Bar Chart)</h3>
        <div className="chart-container">
          <Bar data={barChartData} options={options} />
        </div>
      </div>

      {/* 📈 Revenue & Orders (Line Chart) */}
      <div className="chart-box">
        <h3>📈 Revenue & Orders (Line Chart)</h3>
        <div className="chart-container">
          <Line data={lineChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RevenueOrdersChart;
