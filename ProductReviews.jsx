import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../../styles/Reviews/ProductReviews.css";

const borderColors = ["#f43676", "#4caf50", "#2196f3", "#ff9800", "#9c27b0"];

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, "reviews"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(items);
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <h2 className="review-heading">What People Are Saying</h2>
      <div className="review-cards-wrapper">
        {reviews.map((review, idx) => (
          <div
            className="review-card"
            key={review.id}
            style={{ borderTop: `5px solid ${borderColors[idx % borderColors.length]}` }}
          >
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span
  className="review-gender"
  style={{ backgroundColor: borderColors[idx % borderColors.length], color: "#fff", padding: "2px 8px", borderRadius: "12px", fontSize: "0.85rem" }}
>
  {review.gender === "Male" ? "Male" : review.gender === "Female" ? "Female" : "🌐"}
</span>

            </div>
            <div className="review-details">
              <p><strong>Age:</strong> {review.age}</p>
              <p><strong>Country:</strong> {review.country}</p>
              <p><strong>Product:</strong> {review.productName}</p>
              <p className="review-text">"{review.review}"</p>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Number(review.rating) ? "filled" : ""}>★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
