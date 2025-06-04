import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/ProductPage.css";
import { doc, setDoc } from "firebase/firestore";

const ProductPage = () => {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch published products and current cart
  useEffect(() => {
    const q = query(collection(db, "products"), where("status", "==", "publish"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPublishedProducts(products);
    });

    const fetchCartItems = async () => {
      const cartSnap = await getDocs(collection(db, "cart"));
      const productIds = cartSnap.docs.map(doc => doc.id); // ✅ doc.id now matches product.id
      setCartProductIds(productIds);
    };

    fetchCartItems();
    return () => unsubscribe();
  }, []);

  const handleBuyNow = async (product) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "cart", product.id), {
        ...product,
        quantity: 1,
        createdAt: serverTimestamp(),
      });
      setCartProductIds((prev) => [...prev, product.id]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    setLoading(false);
  };
  

  const handleViewCart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };


  

  return (
    <div className="product-page">
      {loading && <div className="loader-overlay"><div className="loader" /></div>}
      <h1>Published Products</h1>
      <div className="product-grid">
        {publishedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div className="category-ribbon">{product.category || "General"}</div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">Price: ${product.price}</p>

            {cartProductIds.includes(product.id) ? (
  <>
    <button className="added">Added to Cart</button>
    <button className="view-cart-btn" onClick={handleViewCart}>View Cart</button>
  </>
) : (
  <button onClick={() => handleBuyNow(product)}>Buy Now</button>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
