import React from "react";
import { FaMedal, FaStar, FaTrophy, FaCalendarCheck, FaRocket } from "react-icons/fa";
import "../../Styles/Profile/UserBadges.css"; // ← include the CSS below

const badges = [
    {
      icon: <FaMedal className="badge-icon" />,
      title: "Top Attendee",
      description: "Attended the most events this month!",
      colorClass: "gold",
    },
    {
      icon: <FaCalendarCheck className="badge-icon" />,
      title: "Early Bird",
      description: "Registered early for 5+ events.",
      colorClass: "green",
    },
    {
      icon: <FaTrophy className="badge-icon" />,
      title: "Event Champion",
      description: "Participated in 10+ events.",
      colorClass: "purple",
    },
    {
      icon: <FaRocket className="badge-icon" />,
      title: "Rising Star",
      description: "New user with fast engagement.",
      colorClass: "pink",
    },
    {
      icon: <FaStar className="badge-icon" />,
      title: "Verified Pro",
      description: "Verified and active user.",
      colorClass: "blue",
    },
  ];
  

const UserBadges = () => {
  return (
    <div className="user-badges">
      <h2 className="badges-title">Achievements & Badges</h2>
      <div className="badge-list">
        {badges.map((badge, index) => (
          <div key={index} className={`badge-card ${badge.colorClass}`}>
          <div className="badge-tooltip">{badge.description}</div>
          {React.cloneElement(badge.icon, { className: `badge-icon ${badge.colorClass}` })}
          <span className="badge-label">{badge.title}</span>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default UserBadges;
