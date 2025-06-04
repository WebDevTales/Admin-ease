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
import "../../styles/BubbleCharts/ProductCustomerBubbleChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Product Sales Data
const productSalesData = {
  datasets: [
    {
      label: "Electronics",
      data: [{ x: 1, y: 150, r: 20 }],
      backgroundColor: "#FF6384",
    },
    {
      label: "Clothing",
      data: [{ x: 2, y: 120, r: 15 }],
      backgroundColor: "#36A2EB",
    },
    {
      label: "Furniture",
      data: [{ x: 3, y: 90, r: 25 }],
      backgroundColor: "#FFCE56",
    },
    {
      label: "Sports",
      data: [{ x: 4, y: 200, r: 30 }],
      backgroundColor: "#4BC0C0",
    },
  ],
};

// Customer Segmentation Data
const customerSegmentData = {
  datasets: [
    {
      label: "18-25",
      data: [{ x: 1, y: 300, r: 25 }],
      backgroundColor: "#FF5733",
    },
    {
      label: "26-35",
      data: [{ x: 2, y: 250, r: 20 }],
      backgroundColor: "#33FF57",
    },
    {
      label: "36-45",
      data: [{ x: 3, y: 200, r: 18 }],
      backgroundColor: "#3357FF",
    },
    {
      label: "46+",
      data: [{ x: 4, y: 150, r: 15 }],
      backgroundColor: "#F39C12",
    },
  ],
};

const productOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
  },
  scales: {
    x: { title: { display: true, text: "Product Categories" } },
    y: { title: { display: true, text: "Number of Orders" } },
  },
};

const customerOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
  },
  scales: {
    x: { title: { display: true, text: "Customer Age Groups" } },
    y: { title: { display: true, text: "Total Orders" } },
  },
};

const ProductCustomerBubbleChart = () => {
  return (
    <div className="bubble-chart-wrapper">
      {/* Product Sales Bubble Chart */}
      <div className="product-chart-box">
        <h2>📦 Product Sales Overview</h2>
        <div className="bubble-chart-container">
          <Bubble data={productSalesData} options={productOptions} />
        </div>
      </div>

      {/* Customer Segmentation Bubble Chart */}
      <div className="customer-chart-box">
        <h2>👥 Customer Segmentation</h2>
        <div className="bubble-chart-container">
          <Bubble data={customerSegmentData} options={customerOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProductCustomerBubbleChart;
