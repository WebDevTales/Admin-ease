import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../../styles/Orders/OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

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

  const handleStatusChange = async (orderId, newStatus) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });

    setToastMessage(`Order status updated to "${newStatus}"`);

    // Move the order to the sales collection if completed
    if (newStatus === "completed") {
      try {
        const orderDoc = await getDoc(orderRef);
        if (orderDoc.exists()) {
          const orderData = orderDoc.data();
          
          // Ensure order data is properly transferred to sales collection
          const salesRef = doc(db, "sales", orderId);
          await setDoc(salesRef, {
            ...orderData,
            status: "completed", // Ensure status is 'completed' in sales
            movedToSalesAt: new Date(), // Add timestamp of when moved to sales
          });

          setToastMessage("Order moved to sales!");
        } else {
          setToastMessage("Order not found.");
        }
      } catch (error) {
        setToastMessage("Error moving order to sales.");
        console.error("Error moving order to sales: ", error);
      }
    }

    // Re-fetch data after status change
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status completed";
      case "pending":
        return "status pending";
      case "on the way":
        return "status on-the-way";
      default:
        return "status";
    }
  };

  return (
    <div className="order-management-section">
      <h3>📦 Order Management</h3>
      <div className="toast">{toastMessage && <div className="toast-message">{toastMessage}</div>}</div>
      <div className="table-container">
        <table className="order-management-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
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
                  <span className={getStatusClass(order.status)}>{order.status}</span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="pending">Pending</option>
                    <option value="on the way">On the Way</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
