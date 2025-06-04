import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FaClipboardList, FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';
import "../../styles/Orders/ordersStatus.css";

const OrdersStatus = () => {
  const [ordersData, setOrdersData] = useState({
    total: 0,
    pending: 0,
    onTheWay: 0,
    completed: 0
  });

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const counts = {
        total: 0,
        pending: 0,
        onTheWay: 0,
        completed: 0
      };

      snapshot.forEach((doc) => {
        counts.total++;
        const status = doc.data().status?.toLowerCase() || 'pending';

        if (status === 'pending') counts.pending++;
        else if (status === 'on the way' || status === 'shipped') counts.onTheWay++;
        else if (status === 'completed' || status === 'delivered') counts.completed++;
      });

      setOrdersData(counts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="status-grid">
      <div className="status-card" id="card-total">
        <div className="card-icon" id="icon-total">
          <FaClipboardList size={24} />
        </div>
        <div className="card-content">
          <p className="card-title">Total Orders</p>
          <p className="card-value">{ordersData.total}</p>
        </div>
      </div>

      <div className="status-card" id="card-pending">
        <div className="card-icon" id="icon-pending">
          <FaClock size={24} />
        </div>
        <div className="card-content">
          <p className="card-title">Pending</p>
          <p className="card-value">{ordersData.pending}</p>
        </div>
      </div>

      <div className="status-card" id="card-onway">
        <div className="card-icon" id="icon-onway">
          <FaTruck size={24} />
        </div>
        <div className="card-content">
          <p className="card-title">On the Way</p>
          <p className="card-value">{ordersData.onTheWay}</p>
        </div>
      </div>

      <div className="status-card" id="card-completed">
        <div className="card-icon" id="icon-completed">
          <FaCheckCircle size={24} />
        </div>
        <div className="card-content">
          <p className="card-title">Completed</p>
          <p className="card-value">{ordersData.completed}</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersStatus;
