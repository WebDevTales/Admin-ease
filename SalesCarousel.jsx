import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../../styles/Sales/salesCarousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SalesCarousel = () => {
  const [sales, setSales] = useState([]);
  const carouselRef = useRef(null);

  const getRandomRating = () => {
    const min = 3.5;
    const max = 5.0;
    const step = 0.1;
    const rating = Math.floor((Math.random() * (max - min)) / step) * step + min;
    return rating.toFixed(1);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sales"), (snapshot) => {
      const salesData = [];
      snapshot.forEach((doc) => {
        salesData.push({ id: doc.id, ...doc.data(), rating: getRandomRating() });
      });
      setSales(salesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="premium-carousel-wrapper">
      <div className="carousel-title-wrapper">
        <h2 className="carousel-title">Recent Sales Products</h2>
        <div className="carousel-title-line"></div>
      </div>
      
      <div className="carousel-container">
        <button className="carousel-arrow left-arrow" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        
        <div className="premium-carousel" ref={carouselRef}>
          {sales.map((sale, index) => (
            <div className="ultra-card" key={index}>
              <div className="top-category">{sale.category || "Unknown"}</div>
              <div className="right-sold">SOLD</div>

              <div className="ultra-image">
                <img
                  src={sale.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={sale.name || "Product"}
                />
                <div className="image-fade"></div>
              </div>

              <div className="ultra-info">
                <div className="info-top">
                  <span className="product-name">{sale.name || "Unnamed"}</span>
                  <span className="product-price">${sale.price || "0.00"}</span>
                </div>
                <div className="info-bottom">
                  <span className="rating">⭐ {sale.rating}</span>
                  <span className="status">{sale.status || "Unknown"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-arrow right-arrow" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SalesCarousel;