import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "../../styles/Products/ProductStats.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Utility to generate a unique color from a string
const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const ProductStats = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => doc.data());
      setProducts(productList);
    });
    return () => unsubscribe();
  }, []);

  const statusCounts = {
    publish: products.filter((p) => p.status === "publish").length,
    private: products.filter((p) => p.status === "private").length,
  };

  const categoryCounts = products.reduce((acc, curr) => {
    const category = curr.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categoryCounts);
  const categoryColors = categoryLabels.map((label) => getColorFromString(label));

  const statusData = {
    labels: ["Published", "Private"],
    datasets: [
      {
        data: [statusCounts.publish, statusCounts.private],
        backgroundColor: ["#6a00f4", "#ff69b4"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(categoryCounts),
        backgroundColor: categoryColors,
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="product-stats-wrapper">
      <div className="product-chart pie">
        <Pie
          data={statusData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: { color: "#333", font: { size: 14 } },
              },
              title: {
                display: true,
                text: "Product Visibility",
                font: { size: 18 },
                color: "#000",
              },
            },
          }}
        />
      </div>
      <div className="product-chart bar">
        <Bar
          data={categoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Products per Category",
                font: { size: 18 },
                color: "#000",
              },
            },
            scales: {
              x: {
                ticks: { color: "#333", font: { size: 13 } },
                grid: { display: false },
              },
              y: {
                beginAtZero: true,
                ticks: { color: "#333", font: { size: 13 } },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductStats;
