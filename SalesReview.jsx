import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../../styles/Sales/salesreview.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const SalesCharts = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [productRevenue, setProductRevenue] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sales"), (snapshot) => {
      const currentYear = new Date().getFullYear();
      const now = new Date();
      const last7Months = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
        return {
          label: d.toLocaleString("default", { month: "short" }),
          month: d.getMonth(),
          year: d.getFullYear(),
          total: 0,
        };
      });

      let dynamicProductRevenue = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const price = parseFloat(data.price) || 0;
        const timestamp = data.timestamp?.toDate?.() || new Date(); // fallback to avoid crash

        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();

        // Add to last7Months if match
        last7Months.forEach((entry) => {
          if (entry.month === month && entry.year === year) {
            entry.total += price;
          }
        });

        // Sum for "Products" section
        dynamicProductRevenue += price;
      });

      setMonthlySales(last7Months);
      setProductRevenue(dynamicProductRevenue);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Sales Overview Chart
  const salesData = {
    labels: monthlySales.map((m) => m.label),
    datasets: [
      {
        label: "Total Sales ($)",
        data: monthlySales.map((m) => m.total),
        backgroundColor: "#f59e0b",
        borderRadius: 5,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 }, color: "#333" },
      },
      title: {
        display: true,
        text: "Sales Overview (Last 7 Months)",
        font: { size: 18 },
        color: "#000",
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#333", font: { size: 13 } } },
      y: { beginAtZero: true, ticks: { color: "#333", font: { size: 13 } } },
    },
  };

  // ✅ Revenue Breakdown Pie Chart
  const revenueData = {
    labels: ["Products", "Services", "Subscriptions"],
    datasets: [
      {
        label: "Revenue Distribution",
        data: [productRevenue, 2500, 1500], // Dynamic + dummy values
        backgroundColor: ["#f59e0b", "#22c55e", "#3b82f6"],
        hoverOffset: 5,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: { font: { size: 14 }, color: "#333" },
      },
      title: {
        display: true,
        text: "Revenue Breakdown",
        font: { size: 18 },
        color: "#000",
      },
    },
  };

  return (
    <div className="charts-container">
      <div className="chart-item">
        <Bar data={salesData} options={salesOptions} />
      </div>
      <div className="chart-item">
        <Pie data={revenueData} options={revenueOptions} />
      </div>
    </div>
  );
};

export default SalesCharts;
