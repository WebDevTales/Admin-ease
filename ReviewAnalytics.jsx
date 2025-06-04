import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReviewAnalytics = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, "reviews"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(items);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  // Process data for charts
  const processData = () => {
    // Gender distribution
    const genderData = reviews.reduce((acc, review) => {
      acc[review.gender] = (acc[review.gender] || 0) + 1;
      return acc;
    }, {});

    // Age distribution
    const ageGroups = {
      "Under 18": 0,
      "18-25": 0,
      "26-35": 0,
      "36-50": 0,
      "Over 50": 0,
    };

    reviews.forEach((review) => {
      const age = parseInt(review.age);
      if (age < 18) ageGroups["Under 18"]++;
      else if (age <= 25) ageGroups["18-25"]++;
      else if (age <= 35) ageGroups["26-35"]++;
      else if (age <= 50) ageGroups["36-50"]++;
      else ageGroups["Over 50"]++;
    });

    // Country distribution (top 5)
    const countryData = reviews.reduce((acc, review) => {
      acc[review.country] = (acc[review.country] || 0) + 1;
      return acc;
    }, {});

    const sortedCountries = Object.entries(countryData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Rating trends by month
    const monthlyRatings = {};
    reviews.forEach((review) => {
      if (review.timestamp) {
        const date = new Date(review.timestamp.seconds * 1000);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (!monthlyRatings[monthYear]) {
          monthlyRatings[monthYear] = { sum: 0, count: 0 };
        }
        monthlyRatings[monthYear].sum += parseInt(review.rating);
        monthlyRatings[monthYear].count++;
      }
    });

    const monthlyAverages = Object.entries(monthlyRatings).map(
      ([monthYear, data]) => ({
        monthYear,
        average: data.sum / data.count,
      })
    );

    monthlyAverages.sort((a, b) => {
      const [aMonth, aYear] = a.monthYear.split("/").map(Number);
      const [bMonth, bYear] = b.monthYear.split("/").map(Number);
      return aYear - bYear || aMonth - bMonth;
    });

    return {
      genderData,
      ageGroups,
      sortedCountries,
      monthlyAverages,
    };
  };

  const { genderData, ageGroups, sortedCountries, monthlyAverages } =
    processData();

  // Chart data configurations
  const genderChartData = {
    labels: Object.keys(genderData),
    datasets: [
      {
        label: "Reviews by Gender",
        data: Object.values(genderData),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const ageChartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Reviews by Age Group",
        data: Object.values(ageGroups),
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const countryChartData = {
    labels: sortedCountries.map(([country]) => country),
    datasets: [
      {
        label: "Top 5 Countries",
        data: sortedCountries.map(([_, count]) => count),
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const ratingTrendChartData = {
    labels: monthlyAverages.map(({ monthYear }) => monthYear),
    datasets: [
      {
        label: "Average Rating",
        data: monthlyAverages.map(({ average }) => average.toFixed(1)),
        borderColor: "#9c27b0",
        backgroundColor: "rgba(156, 39, 176, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Reviews",
        },
      },
      x: {
        title: {
          display: true,
          text: "Category",
        },
      },
    },
  };

  const ratingTrendOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 5,
        title: {
          display: true,
          text: "Average Rating",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month/Year",
        },
      },
    },
  };

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="analytics-container">
      <h2>Review Analytics Dashboard</h2>
      
      <div className="chart-row">
        <div className="chart-container">
          <h3>Reviews by Gender</h3>
          <Line data={genderChartData} options={chartOptions} />
        </div>
        
        <div className="chart-container">
          <h3>Reviews by Age Group</h3>
          <Line data={ageChartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="chart-row">
        <div className="chart-container">
          <h3>Top 5 Countries</h3>
          <Line data={countryChartData} options={chartOptions} />
        </div>
        
        <div className="chart-container">
          <h3>Rating Trends Over Time</h3>
          <Line data={ratingTrendChartData} options={ratingTrendOptions} />
        </div>
      </div>
      
      <style jsx>{`
        .analytics-container {
          max-width: 1400px;
          margin: 0 auto;
        }
        h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        h3 {
          text-align: center;
          margin-bottom: 15px;
          color: #555;
        }
        .chart-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }
        .chart-container {
          flex: 1;
          min-width: 300px;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default ReviewAnalytics;