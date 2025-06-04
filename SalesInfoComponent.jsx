import React from 'react';
import { 
  FaHandshake, 
  FaPhone, 
  FaComments, 
  FaChartLine, 
  FaLightbulb, 
  FaUserTie,
  FaDollarSign,
  FaClock
} from 'react-icons/fa';
import '../../styles/Sales/SalesInfoComponent.css';

const SalesGuideCards = () => {
  const salesTips = [
    {
      title: "Customer Relationships",
      content: "Build trust by understanding needs first. Use open-ended questions and active listening techniques.",
      icon: <FaHandshake className="card-icon" />,
      color: "#4e73df"
    },
    {
      title: "Follow-Up Strategy",
      content: "80% of sales require 5+ follow-ups. Create a personalized sequence with varied touchpoints.",
      icon: <FaPhone className="card-icon" />,
      color: "#1cc88a"
    },
    {
      title: "Objection Handling",
      content: "Use LAER method: Listen, Acknowledge, Explore, Respond. Objections are buying signals.",
      icon: <FaComments className="card-icon" />,
      color: "#f6c23e"
    },
    {
      title: "Value Proposition",
      content: "Focus on outcomes, not features. Clearly articulate how you solve their specific problems.",
      icon: <FaChartLine className="card-icon" />,
      color: "#e74a3b"
    },
    {
      title: "Active Listening",
      content: "Practice the 70/30 rule - customer should speak 70% of the time during discovery.",
      icon: <FaLightbulb className="card-icon" />,
      color: "#36b9cc"
    },
    {
      title: "Professional Presence",
      content: "Dress one level above your client. Mirror their communication style for better rapport.",
      icon: <FaUserTie className="card-icon" />,
      color: "#858796"
    },
    {
      title: "Pricing Confidence",
      content: "Never apologize for price. Present it as an investment with clear ROI justification.",
      icon: <FaDollarSign className="card-icon" />,
      color: "#f43676"
    },
    {
      title: "Time Management",
      content: "Prioritize prospects using BANT: Budget, Authority, Need, Timeline qualification.",
      icon: <FaClock className="card-icon" />,
      color: "#5a5c69"
    }
  ];

  return (
    <div className="sales-guide-container">
      <h2 className="section-title">Sales Excellence Guide</h2>
      <p className="section-subtitle">Best practices to elevate your sales performance</p>
      
      <div className="cards-grid">
        {salesTips.map((tip, index) => (
          <div 
            className="guide-card" 
            key={index}
            style={{ borderTop: `4px solid ${tip.color}` }}
          >
            <div className="card-header" style={{ color: tip.color }}>
              {tip.icon}
              <h3>{tip.title}</h3>
            </div>
            <div className="card-content">
              <p>{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesGuideCards;