import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [productsToPay, setProductsToPay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [reviewData, setReviewData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    review: "",
    rating: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (id && state?.product) {
        setProductsToPay([state.product]);
      } else {
        const snapshot = await getDocs(collection(db, "cart"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsToPay(items);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [id, state]);

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      for (const product of productsToPay) {
        await addDoc(collection(db, "orders"), {
          ...product,
          status: "pending",
          createdAt: serverTimestamp(),
        });

        await deleteDoc(doc(db, "cart", product.id));
      }
      setConfirmationVisible(true);
    } catch (err) {
      console.error("Payment error:", err);
    }
    setLoading(false);
  };

  const handleReviewSubmit = async () => {
    try {
      for (const product of productsToPay) {
        await addDoc(collection(db, "reviews"), {
          productId: product.id,
          productName: product.name,
          ...reviewData,
          createdAt: serverTimestamp(),
        });
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/products/:id"); // Updated from /products/:id
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Summary</h1>

      {loading ? (
        <div className="payment-loader">Processing...</div>
      ) : confirmationVisible ? (
        showReviewForm ? (
          <div className="review-form">
            <h2>📝 Leave a Review</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={reviewData.name}
              onChange={(e) =>
                setReviewData({ ...reviewData, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Your Age"
              value={reviewData.age}
              onChange={(e) =>
                setReviewData({ ...reviewData, age: e.target.value })
              }
            />
            <select
              value={reviewData.gender}
              onChange={(e) =>
                setReviewData({ ...reviewData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Your Country"
              value={reviewData.country}
              onChange={(e) =>
                setReviewData({ ...reviewData, country: e.target.value })
              }
            />
            <textarea
              placeholder="Write your review..."
              value={reviewData.review}
              onChange={(e) =>
                setReviewData({ ...reviewData, review: e.target.value })
              }
            ></textarea>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1 to 5)"
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.target.value })
              }
            />
            <button className="submit-review-btn" onClick={handleReviewSubmit}>
              Submit Review
            </button>

            {showToast && (
              <div className="toast show">
                ✅ Review submitted successfully!
              </div>
            )}
          </div>
        ) : (
          <div className="confirmation-box">
            <h2>✅ Payment Successful!</h2>
            <p>Your order is now pending confirmation.</p>
            <button
              className="review-btn"
              onClick={() => setShowReviewForm(true)}
            >
              Leave a Review
            </button>
          </div>
        )
      ) : (
        <>
          <div className="payment-items">
            {productsToPay.map((item) => (
              <div key={item.id} className="payment-item">
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="confirm-btn" onClick={handleConfirmPayment}>
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
