import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import "../../styles/Reviews/ReviewBanner.css"; // Adjust the path

const ReviewBanner = () => {
  return (
    <div className="review-banner">
      <div className="review-banner-icon">
        <FaRegCommentDots />
      </div>
      <div className="review-banner-text">
        <h2>User Reviews</h2>
        <p>Insights and feedback from our valued users</p>
      </div>
    </div>
  );
};

export default ReviewBanner;
