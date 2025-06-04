import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "../../styles/Products/ReviewList.css"; // Import the CSS

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    review: "Amazing product! Highly recommended.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4.5,
    review: "Great quality, but delivery took longer than expected.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 3,
    review: "Decent product, but could be improved.",
  },
  {
    id: 4,
    name: "Emma Williams",
    rating: 4,
    review: "Satisfied with my purchase. Will buy again!",
  },
  {
    id: 5,
    name: "David Brown",
    rating: 2,
    review: "Not worth the price, expected better.",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    rating: 5,
    review: "Best product I’ve bought this year!",
  },
  {
    id: 7,
    name: "Charles Davis",
    rating: 3.5,
    review: "Not bad, but could be more efficient.",
  },
  {
    id: 8,
    name: "Michael Lee",
    rating: 4.5,
    review: "Love this product, will definitely buy again.",
  },
];

// Function to generate star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="star full" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="star half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} className="star empty" />
      ))}
    </>
  );
};

const ReviewList = () => {
  return (
    <div className="review-section">
      <h2 className="review-title">Customer Reviews</h2>
      <p className="review-subtitle">
        See what our customers are saying about our products.
      </p>

      <div className="review-container">
        {reviews.map((review, index) => (
          <div key={review.id} className={`review-card card-${index + 1}`}>
            <div className="review-header">
              <FaUserCircle className="user-icon" />
              <h4>{review.name}</h4>
            </div>
            <p className="review-text">"{review.review}"</p>
            <div className="rating">{renderStars(review.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
