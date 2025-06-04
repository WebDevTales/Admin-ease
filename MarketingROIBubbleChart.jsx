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
import "../../styles/BubbleCharts/MarketingROIBubbleChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Marketing Campaign ROI Data
const marketingROIData = {
  datasets: [
    {
      label: "Google Ads",
      data: [{ x: 5000, y: 60, r: 25 }],
      backgroundColor: "#FF6384",
    },
    {
      label: "Facebook Ads",
      data: [{ x: 3000, y: 45, r: 20 }],
      backgroundColor: "#36A2EB",
    },
    {
      label: "Instagram Ads",
      data: [{ x: 4000, y: 55, r: 22 }],
      backgroundColor: "#FFCE56",
    },
    {
      label: "LinkedIn Ads",
      data: [{ x: 2000, y: 30, r: 18 }],
      backgroundColor: "#4BC0C0",
    },
  ],
};

const roiOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
  },
  scales: {
    x: { title: { display: true, text: "Ad Spend ($)" } },
    y: { title: { display: true, text: "Sales Conversions (%)" } },
  },
};

const MarketingROIBubbleChart = () => {
  return (
    <div className="roi-chart-wrapper">
      <div className="roi-chart-box">
        <h2>📈 Marketing Campaign ROI</h2>
        <div className="roi-bubble-chart-container">
          <Bubble data={marketingROIData} options={roiOptions} />
        </div>
      </div>
    </div>
  );
};

export default MarketingROIBubbleChart;
