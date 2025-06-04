import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../../styles/BubbleCharts/SeasonalReturnsBubbleChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Seasonal Sales Trend Data
const seasonalSalesData = {
  datasets: [
    {
      label: "Black Friday",
      data: [{ x: 1, y: 80, r: 30 }],
      backgroundColor: "#FF5733",
    },
    {
      label: "Christmas",
      data: [{ x: 2, y: 60, r: 25 }],
      backgroundColor: "#33FF57",
    },
    {
      label: "New Year",
      data: [{ x: 3, y: 50, r: 22 }],
      backgroundColor: "#3357FF",
    },
    {
      label: "Summer Sale",
      data: [{ x: 4, y: 40, r: 20 }],
      backgroundColor: "#F39C12",
    },
  ],
};

// Product Returns & Refunds Data
const returnsRefundsData = {
  datasets: [
    {
      label: "Electronics",
      data: [{ x: 1, y: 15, r: 25 }],
      backgroundColor: "#FF6384",
    },
    {
      label: "Clothing",
      data: [{ x: 2, y: 10, r: 18 }],
      backgroundColor: "#36A2EB",
    },
    {
      label: "Furniture",
      data: [{ x: 3, y: 12, r: 20 }],
      backgroundColor: "#FFCE56",
    },
    {
      label: "Sports",
      data: [{ x: 4, y: 8, r: 15 }],
      backgroundColor: "#4BC0C0",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
  },
  scales: {
    x: { title: { display: true, text: "Seasons / Product Categories" } },
    y: { title: { display: true, text: "Sales Growth (%) / Return Rate (%)" } },
  },
};

const SeasonalReturnsBubbleChart = () => {
  return (
    <div className="seasonal-returns-chart-wrapper">
      {/* Seasonal Sales Trend Bubble Chart */}
      <div className="seasonal-chart-box">
        <h2>📊 Seasonal Sales Trends</h2>
        <div className="seasonal-bubble-chart-container">
          <Bubble data={seasonalSalesData} options={chartOptions} />
        </div>
      </div>

      {/* Product Returns & Refunds Bubble Chart */}
      <div className="returns-chart-box">
        <h2>🔄 Product Returns & Refunds</h2>
        <div className="returns-bubble-chart-container">
          <Bubble data={returnsRefundsData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SeasonalReturnsBubbleChart;
