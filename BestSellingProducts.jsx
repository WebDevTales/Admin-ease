import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import "../../styles/Sales/bestSellingproducts.css";

const BestSellingProducts = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'sales'), (snapshot) => {
      const productMap = new Map();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const name = data.name;
        const category = data.category || 'Unknown';
        const quantity = data.quantity || 1;
        const price = parseFloat(data.price) || 0;

        const key = `${name}-${category}`;

        if (productMap.has(key)) {
          const existing = productMap.get(key);
          productMap.set(key, {
            ...existing,
            quantity: existing.quantity + quantity,
            totalRevenue: existing.totalRevenue + price,
          });
        } else {
          productMap.set(key, {
            name,
            category,
            quantity,
            totalRevenue: price,
          });
        }
      });

      const sortedProducts = Array.from(productMap.values())
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // top 5

      setTopProducts(sortedProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="best-selling-wrapper">
      <h3>🏆 Best Selling Products</h3>
      <div className="best-selling-table">
        <div className="table-row header">
          <span>#</span>
          <span>Product Name</span>
          <span>Category</span>
          <span>Quantity Sold</span>
          <span>Total Revenue</span>
        </div>
        {topProducts.map((product, index) => (
          <div className="table-row" key={index}>
            <span>{index + 1}</span>
            <span>{product.name}</span>
            <span>{product.category}</span>
            <span>{product.quantity}</span>
            <span>${product.totalRevenue.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
