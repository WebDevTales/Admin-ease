import React, { useEffect, useState } from "react";
import { FaStar, FaThumbsUp, FaRegComments, FaUsers } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // adjust path as needed
import "../../styles/Reviews/ReviewStats.css";

const ReviewStats = () => {
  const [stats, setStats] = useState({
    totalReviews: 0,
    bestReviews: 0,
    averageRating: 0,
    writtenFeedback: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviews = querySnapshot.docs.map(doc => doc.data());

      const total = reviews.length;
      const best = reviews.filter(r => r.rating >= 4).length;
      const written = reviews.filter(r => r.comment && r.comment.trim() !== "").length;
      const validRatings = reviews
      .map(r => Number(r.rating))
      .filter(r => !isNaN(r) && r > 0);
    
    const averageRating = validRatings.length
      ? (validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length).toFixed(1)
      : 0;
    
      setStats({
        totalReviews: total,
        bestReviews: best,
        averageRating: averageRating,
        writtenFeedback: written,
      });
    };

    fetchStats();
  }, []);

  const statTiles = [
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: <FaUsers />,
      color: "#3f51b5",
    },
    {
      title: "Best Star Reviews (4–5)",
      value: stats.bestReviews,
      icon: <FaStar />,
      color: "#f59e0b",
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      icon: <FaThumbsUp />,
      color: "#4caf50",
    },
    {
      title: "Written Feedback",
      value: stats.writtenFeedback,
      icon: <FaRegComments />,
      color: "#f43676",
    },
  ];

  return (
    <div className="review-stats-container">
  {statTiles.map((stat, index) => (
    <div
      className="stat-tile"
      key={index}
      style={{ borderTop: `5px solid ${stat.color}` }} // Dynamically setting border-top
    >
      <div className="stat-icon" style={{ backgroundColor: stat.color }}>
        {stat.icon}
      </div>
      <div className="stat-content">
        <h3>{stat.value}</h3>
        <p>{stat.title}</p>
      </div>
    </div>
  ))}
</div>

  );
};

export default ReviewStats;
