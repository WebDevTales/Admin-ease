import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../../styles/Dashboard/RecentOrders.css";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          status: data.status,
          date: data.createdAt?.toDate().toLocaleDateString() || "N/A",
        };
      });
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status completed";
      case "pending":
        return "status pending";
      case "shipped":
        return "status shipped";
      case "processing":
        return "status processing";
      case "cancelled":
        return "status cancelled";
      default:
        return "status"; // default if status is missing
    }
  };
  
  

  return (
    <div className="recent-orders-section">
      <h3>📦 Recent Orders</h3>
      <div className="table-container">
        <table className="recent-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
