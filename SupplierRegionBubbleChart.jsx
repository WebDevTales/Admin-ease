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
import "../../styles/BubbleCharts/SupplierRegionBubbleChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Supplier Performance Data
const supplierPerformanceData = {
  datasets: [
    {
      label: "Supplier A",
      data: [{ x: 1, y: 85, r: 20 }],
      backgroundColor: "#FF5733",
    },
    {
      label: "Supplier B",
      data: [{ x: 2, y: 75, r: 18 }],
      backgroundColor: "#33FF57",
    },
    {
      label: "Supplier C",
      data: [{ x: 3, y: 90, r: 25 }],
      backgroundColor: "#3357FF",
    },
    {
      label: "Supplier D",
      data: [{ x: 4, y: 65, r: 15 }],
      backgroundColor: "#F39C12",
    },
  ],
};

// Region-Wise Sales Data
const regionWiseSalesData = {
  datasets: [
    {
      label: "North America",
      data: [{ x: 1, y: 5000, r: 30 }],
      backgroundColor: "#FF6384",
    },
    {
      label: "Europe",
      data: [{ x: 2, y: 4000, r: 25 }],
      backgroundColor: "#36A2EB",
    },
    {
      label: "Asia",
      data: [{ x: 3, y: 7000, r: 35 }],
      backgroundColor: "#FFCE56",
    },
    {
      label: "Australia",
      data: [{ x: 4, y: 3000, r: 20 }],
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
    x: { title: { display: true, text: "Suppliers / Regions" } },
    y: { title: { display: true, text: "Timeliness (%) / Sales Numbers" } },
  },
};

const SupplierRegionBubbleChart = () => {
  return (
    <div className="supplier-region-chart-wrapper">
      {/* Supplier Performance Bubble Chart */}
      <div className="supplier-chart-box">
        <h2>📦 Supplier Performance</h2>
        <div className="supplier-bubble-chart-container">
          <Bubble data={supplierPerformanceData} options={chartOptions} />
        </div>
      </div>

      {/* Region-Wise Sales Bubble Chart */}
      <div className="region-chart-box">
        <h2>🌍 Region-Wise Sales</h2>
        <div className="region-bubble-chart-container">
          <Bubble data={regionWiseSalesData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SupplierRegionBubbleChart;
