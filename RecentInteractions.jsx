import React, { useState } from "react";
import { 
  FaCommentDots, 
  FaEnvelope, 
  FaPhone, 
  FaBell, 
  FaCalendarCheck, 
  FaCheckCircle 
} from "react-icons/fa";
import "../../styles/Contacts/RecentInteractions.css";

const RecentInteractions = () => {
  // Original sample interactions data
  const [interactions] = useState([
    { id: 1, name: "John Doe", type: "message", content: "Hey, can we discuss the new project?", time: "10:30 AM" },
    { id: 2, name: "Alice Smith", type: "email", content: "Invoice for the last order has been sent.", time: "Yesterday" },
    { id: 3, name: "Bob Johnson", type: "call", content: "Called regarding product details.", time: "2 days ago" },
    { id: 4, name: "Michael Lee", type: "message", content: "Looking forward to our meeting!", time: "3 days ago" },
    { id: 5, name: "Sarah Connor", type: "email", content: "Your subscription has been renewed.", time: "4 days ago" },
  ]);

  // Original sample notifications data with proper messages
  const [notifications] = useState([
    { id: 1, type: "info", message: "System update completed successfully!", time: "5 minutes ago" },
    { id: 2, type: "warning", message: "Storage running low. Please clean up your files.", time: "10 minutes ago" },
    { id: 3, type: "error", message: "Email failed to send. Please retry.", time: "15 minutes ago" },
    { id: 4, type: "success", message: "User registration completed successfully.", time: "20 minutes ago" },
    { id: 5, type: "success", message: "Your scheduled meeting is confirmed.", time: "25 minutes ago" },
  ]);

  // Prepopulated chat for each user (using the original interactions)
  const [chatMessages, setChatMessages] = useState({
    1: [
      { sender: "user", content: "Hi, I need help with my project." },
      { sender: "admin", content: "Hello John, how can I assist you?" },
    ],
    2: [
      { sender: "user", content: "I have a question about the invoice." },
      { sender: "admin", content: "Hi Alice, please let me know what you need." },
    ],
    3: [
      { sender: "user", content: "Can you send me more details about the call?" },
      { sender: "admin", content: "Hi Bob, I'll forward you the call summary." },
    ],
    4: [
      { sender: "user", content: "What time is our meeting scheduled?" },
      { sender: "admin", content: "Hello Michael, it's scheduled for 2 PM tomorrow." },
    ],
    5: [
      { sender: "user", content: "I received a renewal notice. Can you confirm?" },
      { sender: "admin", content: "Hi Sarah, your subscription has been renewed." },
    ],
  });

  // Chat popup state
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  // Open chat modal for selected interaction
  const openChatModal = (interaction) => {
    setActiveChat(interaction);
    // If no conversation exists, optionally display a fallback message.
    if (!chatMessages[interaction.id] || chatMessages[interaction.id].length === 0) {
      setChatMessages((prev) => ({ ...prev, [interaction.id]: [{ sender: "system", content: "No previous messages." }] }));
    }
  };

  // Send new admin message
  const sendChatMessage = () => {
    if (activeChat && messageInput.trim() !== "") {
      setChatMessages((prev) => ({
        ...prev,
        [activeChat.id]: [
          ...(prev[activeChat.id] || []),
          { sender: "admin", content: messageInput }
        ]
      }));
      setMessageInput("");
    }
  };

  // Close chat popup
  const closeChatModal = () => {
    setActiveChat(null);
  };

  // Return appropriate icon for interaction type (with unique colors)
  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <FaCommentDots className="ri-icon ri-message" />;
      case "email":
        return <FaEnvelope className="ri-icon ri-email" />;
      case "call":
        return <FaPhone className="ri-icon ri-call" />;
      default:
        return null;
    }
  };

  // Return appropriate icon for notification type (with unique colors)
  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <FaBell className="ri-notif-icon ri-info" />;
      case "warning":
        return <FaCalendarCheck className="ri-notif-icon ri-warning" />;
      case "error":
        return <FaEnvelope className="ri-notif-icon ri-error" />;
      case "success":
        return <FaCheckCircle className="ri-notif-icon ri-success" />;
      default:
        return <FaBell className="ri-notif-icon" />;
    }
  };

  return (
    <div className="ri-container">
      {/* Interactions Section */}
      <div className="ri-card ri-interactions">
        <h3 className="ri-heading">💬 Recent Interactions</h3>
        <div className="ri-timeline">
          {interactions.map((interaction) => (
            <div 
              key={interaction.id} 
              className="ri-timeline-item" 
              onClick={() => openChatModal(interaction)}
            >
              <div className="ri-icon-container">
                {getIcon(interaction.type)}
              </div>
              <div className="ri-item-content">
                <h4 className="ri-name">{interaction.name}</h4>
                <p className="ri-text">{interaction.content}</p>
                <span className="ri-time">{interaction.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="ri-card ri-notifications">
        <h3 className="ri-heading">🔔 Live Notifications</h3>
        <div className="ri-notifications-feed">
          {notifications.map((notif) => (
            <div key={notif.id} className={`ri-notification-item ri-${notif.type}`}>
              {getNotificationIcon(notif.type)}
              <div className="ri-notif-content">
                <p className="ri-notif-text">{notif.message}</p>
                <span className="ri-notif-time">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Popup Modal */}
      {activeChat && (
        <div className="ri-chat-popup">
          <div className="ri-chat-card">
            <div className="ri-chat-header">
              <h3>Chat with {activeChat.name}</h3>
              <button className="ri-chat-close-btn" onClick={closeChatModal}>X</button>
            </div>
            <div className="ri-chat-body">
              {chatMessages[activeChat.id]?.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`ri-chat-message ${msg.sender === "admin" ? "ri-chat-admin" : "ri-chat-user"}`}
                >
                  {msg.sender !== "admin" && msg.sender !== "system" && (
                    <span className="ri-chat-sender">{activeChat.name}</span>
                  )}
                  {msg.sender === "system" && (
                    <span className="ri-chat-sender ri-chat-system">System</span>
                  )}
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="ri-chat-footer">
              <input
                type="text"
                className="ri-chat-input"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button className="ri-chat-send-btn" onClick={sendChatMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentInteractions;
