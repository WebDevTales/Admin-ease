import React from "react";
import { FaClock, FaUserShield, FaUsers, FaBullhorn, FaBan, FaIdCard, FaTint, FaQuestionCircle, FaCommentDots,FaHistory  } from "react-icons/fa";
import "../../styles/Calendar/EventGuidelines.css";

const guidelines = [
  {
    title: "Be On Time",
    icon: <FaClock />,
    description: "All events start promptly. Late entry might not be allowed depending on the event.",
    color: "#f43676"
  },
  {
    title: "Respect Others",
    icon: <FaUserShield />,
    description: "Maintain a respectful attitude towards all participants and organizers.",
    color: "#ff9800"
  },
  {
    title: "Participation",
    icon: <FaUsers />,
    description: "Active participation is encouraged to make the most of your event experience.",
    color: "#4caf50"
  },
  {
    title: "Announcements",
    icon: <FaBullhorn />,
    description: "Check the announcements regularly for schedule changes or important updates.",
    color: "#3f51b5"
  },
  {
    title: "No Disruptions",
    icon: <FaBan />,
    description: "Avoid disruptive behavior like loud talking or phone use during sessions.",
    color: "#9c27b0"
  },
  {
    title: "ID Required",
    icon: <FaIdCard />,
    description: "Bring your registration ID or ticket for verification at entry points.",
    color: "#795548"
  },
  {
    title: "Stay Hydrated",
    icon: <FaTint />,
    description: "Carry a water bottle. Hydration points are available throughout the venue.",
    color: "#00bcd4"
  },
  {
    title: "Ask Questions",
    icon: <FaQuestionCircle />,
    description: "Don't hesitate to ask during Q&A sessions or contact staff at help desks.",
    color: "#607d8b"
  },
  {
    title: "Feedback Matters",
    icon: <FaCommentDots />,
    description: "Fill out feedback forms after sessions to help us improve future events.",
    color: "#e91e63"
  },
  {
    title: "Breaks Are Timed",
    icon: <FaHistory />,
    description: "Follow the schedule for breaks and meals to avoid missing sessions.",
    color: "#009688"
  },
  
];

const EventGuidelines = () => {
  return (
    <div className="event-guidelines">
      {guidelines.map((rule, index) => (
        <div className="guideline-card" key={index} style={{ borderTopColor: rule.color }}>
          <div className="card-front">
            <div className="icon" style={{ color: rule.color }}>
              {rule.icon}
            </div>
            <h4>{rule.title}</h4>
          </div>
          <div className="card-back">
            <p>{rule.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGuidelines;
