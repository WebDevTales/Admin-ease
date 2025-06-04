import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaDollarSign } from "react-icons/fa";
import "../../styles/Invoices/InvoiceSummary.css";

const InvoiceSummary = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const invoicesCollectionRef = collection(db, "invoices");
    const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
      const fetchedInvoices = snapshot.docs.map((doc) => doc.data());
      setInvoiceData(fetchedInvoices);
    });

    return () => unsubscribe();
  }, []);

  const calculateSummaryData = () => {
    let total = 0, paid = 0, pending = 0, overdue = 0;

    invoiceData.forEach((invoice) => {
      const amount = parseFloat(invoice.amount);
      total += amount;

      if (invoice.status === "Paid") paid += amount;
      if (invoice.status === "Pending") pending += amount;
      if (invoice.status === "Overdue") overdue += amount;
    });

    return { total, paid, pending, overdue };
  };

  const { total, paid, pending, overdue } = calculateSummaryData();

  const cards = [
    { title: "Total Amount", value: total, icon: <FaDollarSign />, color: "#007bff" },
    { title: "Paid", value: paid, icon: <FaCheckCircle />, color: "#28a745" },
    { title: "Pending", value: pending, icon: <FaClock />, color: "#ffc107" },
    { title: "Overdue", value: overdue, icon: <FaExclamationTriangle />, color: "#dc3545" },
  ];

  return (
    <div className="invoice-summary-container">
      {cards.map((card, index) => (
        <div key={index} className="summary-card" style={{ borderLeft: `5px solid ${card.color}` }}>
          <div className="icon-container" style={{ color: card.color }}>
            {card.icon}
          </div>
          <h4 style={{ color: card.color }}>{card.title}</h4>
          <p>${card.value.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceSummary;
