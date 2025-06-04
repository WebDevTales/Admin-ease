import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../../styles/Dashboard/SalesChart.css"; // Import CSS

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 2300, 1800, 2800, 3200, 4100, 3900, 4500, 5200, 5700, 6200, 7000],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#f59e0b",
        tension: 0.4, // Smooth curve
      },
      {
        label: "Orders",
        data: [800, 1500, 1200, 2100, 2500, 3100, 2900, 3500, 4000, 4500, 4800, 5500],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333", // Dark text for better visibility
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#f59e0b",
        bodyColor: "#fff",
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 0.5,
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="sales-chart">
      <h3>📊 Sales & Orders Overview</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
