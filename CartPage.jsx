import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Full page loader
  const [removing, setRemoving] = useState(null); // Track removal state
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = async (id) => {
    setRemoving(id);
    try {
      const docRef = doc(db, "cart", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.warn(`No document found with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
    setRemoving(null);
  };

  const handlePayNow = (item) => {
    navigate(`/payment/${item.id}`, {
      state: { product: item },
    });
  };

  const handleShowMore = () => setShowMore((prev) => !prev);

  if (loading) {
    return (
      <div className="cart-loader">
        <div className="cart-loader-spinner" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cartItems.slice(0, showMore ? cartItems.length : 3).map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <div className="actions">
                <button
                  className={`remove-btn ${removing === item.id ? "disabled" : ""}`}
                  onClick={() => handleRemove(item.id)}
                  disabled={removing === item.id}
                >
                  {removing === item.id ? "Removing..." : "Remove"}
                </button>
                <button
                  className="pay-btn"
                  onClick={() => handlePayNow(item)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 3 && (
        <div className="show-more-btn-container">
          <button className="show-more-btn" onClick={handleShowMore}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {cartItems.length > 1 && (
        <div className="pay-all-btn-container">
          <button className="pay-all-btn" onClick={() => navigate("/payment")}>
            Proceed to Payment for All
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
