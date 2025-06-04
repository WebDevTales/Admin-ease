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
import "../../styles/Sales/salesComparisonDemographics.css"; // ⬅️ updated CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const SalesComparisonDemographics = () => {
  const [monthlyTotals, setMonthlyTotals] = useState([0, 0, 0]); // [ThisMonth, LastMonth, 2MonthsAgo]
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sales"), (snapshot) => {
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();

      let newMonthlyTotals = [0, 0, 0];
      let newCategoryTotals = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const price = parseFloat(data.price) || 0;
        const timestamp = data.timestamp?.toDate?.() || new Date();
        const category = data.category || "Uncategorized";

        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();

        // Month comparison logic
        if (year === thisYear) {
          if (month === thisMonth) newMonthlyTotals[0] += price;
          else if (month === thisMonth - 1) newMonthlyTotals[1] += price;
          else if (month === thisMonth - 2) newMonthlyTotals[2] += price;
        } else if (thisMonth === 0 && month === 11 && year === thisYear - 1) {
          newMonthlyTotals[1] += price;
        } else if (thisMonth === 1 && month === 11 && year === thisYear - 1) {
          newMonthlyTotals[2] += price;
        }

        // Category totals
        newCategoryTotals[category] = (newCategoryTotals[category] || 0) + price;
      });

      setMonthlyTotals(newMonthlyTotals);
      setCategoryTotals(newCategoryTotals);
    });

    return () => unsubscribe();
  }, []);

  const barData = {
    labels: ["This Month", "Last Month", "2 Months Ago"],
    datasets: [
      {
        label: "Sales ($)",
        data: monthlyTotals,
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales Comparison",
        font: { size: 18 },
      },
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#333" } },
      y: {
        beginAtZero: true,
        ticks: { color: "#333" },
      },
    },
  };

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Sales by Category",
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map(
          (_, i) => `hsl(${(i * 45) % 360}, 70%, 60%)`
        ),
        hoverOffset: 6,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Category-Wise Sales Distribution",
        font: { size: 18 },
      },
      legend: {
        position: "right",
        labels: { font: { size: 13 }, color: "#333" },
      },
    },
  };

  return (
    <div className="sales-comparison-wrapper">
      <div className="sales-chart-container" id="monthly-sales-chart">
        <Bar data={barData} options={barOptions} />
      </div>
      <div className="sales-chart-container" id="category-sales-chart">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default SalesComparisonDemographics;
