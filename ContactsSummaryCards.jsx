import React from "react";
import { FaUsers, FaUserTie, FaShoppingCart, FaEnvelope } from "react-icons/fa";
import "../../styles/Contacts/ContactSummaryCards.css"; // CSS file for styling

const ContactSummaryCards = ({ total, employees, buyers, emails }) => {
  const cards = [
    { title: "Total Contacts", count: total, icon: <FaUsers />, color: "#007bff" },
    { title: "Employee Contacts", count: employees, icon: <FaUserTie />, color: "#28a745" },
    { title: "Buyer Contacts", count: buyers, icon: <FaShoppingCart />, color: "#ffc107" },
    { title: "Emails Collected", count: emails, icon: <FaEnvelope />, color: "#17a2b8" },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <div className="contacticon" style={{ color: card.color }}>{card.icon}</div>
            <h3>{card.title}</h3>
          </div>
          <div className="card-body">
            <h2 style={{ color: card.color }}>{card.count}</h2>
            <p>Total {card.title.toLowerCase()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactSummaryCards;
