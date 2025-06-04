import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaTag, FaBoxOpen } from 'react-icons/fa';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../../styles/sales/infoTiles.css';

const InfoTiles = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [totalQuantitySold, setTotalQuantitySold] = useState(0);

  // Fetch sales data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const salesRef = collection(db, 'sales');
        const salesSnap = await getDocs(salesRef);
        
        let salesAmount = 0;
        let soldProducts = 0;
        let quantitySold = 0;

        salesSnap.forEach((doc) => {
          const data = doc.data();
          const price = parseFloat(data.price) || 0;
          const quantity = parseInt(data.quantity) || 0;
          
          salesAmount += price;
          soldProducts += 1;
          quantitySold += quantity;
        });

        setTotalSales(salesAmount);
        setTotalSoldProducts(soldProducts);
        setTotalQuantitySold(quantitySold);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="info-tiles">
      <div className="info-tile">
        <div className="icon">
          <FaDollarSign />
        </div>
        <div className="info-content">
          <h4>Total Sales</h4>
          <p className="number">${totalSales.toFixed(2)}</p>
        </div>
      </div>

      <div className="info-tile">
        <div className="icon">
          <FaTag />
        </div>
        <div className="info-content">
          <h4>Total Sold Products</h4>
          <p className="number">{totalSoldProducts}</p>
        </div>
      </div>

      <div className="info-tile">
        <div className="icon">
          <FaBoxOpen />
        </div>
        <div className="info-content">
          <h4>Total Quantity Sold</h4>
          <p className="number">{totalQuantitySold}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTiles;
