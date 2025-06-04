import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaUserShield, FaPaperPlane } from "react-icons/fa";
import "../../styles/Contacts/ChatRooms.css";

const ChatRooms = () => {
  // Preloaded messages
  const [employeeMessages, setEmployeeMessages] = useState([
    { sender: "Admin", text: "Welcome, team! Let's stay productive.", type: "admin" },
    { sender: "John", text: "Got it! I'm working on my tasks.", type: "user" },
    { sender: "Alice", text: "Morning everyone!", type: "user" },
    { sender: "Admin", text: "Let's complete the weekly report today.", type: "admin" },
    { sender: "Bob", text: "Noted, I'll handle it.", type: "user" },
  ]);

  const [buyerMessages, setBuyerMessages] = useState([
    { sender: "Admin", text: "Welcome to the buyer chat! Need help?", type: "admin" },
    { sender: "Alice", text: "Do you have bulk order discounts?", type: "user" },
    { sender: "Admin", text: "Yes! We offer special pricing for large orders.", type: "admin" },
    { sender: "John", text: "How long does delivery take?", type: "user" },
    { sender: "Admin", text: "It usually takes 5-7 business days.", type: "admin" },
  ]);

  const [newEmployeeMessage, setNewEmployeeMessage] = useState("");
  const [newBuyerMessage, setNewBuyerMessage] = useState("");

  const employeeChatRef = useRef(null);
  const buyerChatRef = useRef(null);

  useEffect(() => {
    employeeChatRef.current?.scrollTo(0, employeeChatRef.current.scrollHeight);
    buyerChatRef.current?.scrollTo(0, buyerChatRef.current.scrollHeight);
  }, [employeeMessages, buyerMessages]);

  // Send message function
  const sendMessage = (chatType) => {
    if (chatType === "employee" && newEmployeeMessage.trim() !== "") {
      setEmployeeMessages([...employeeMessages, { sender: "Admin", text: newEmployeeMessage, type: "admin" }]);
      setNewEmployeeMessage(""); // Clear input
    }
    if (chatType === "buyer" && newBuyerMessage.trim() !== "") {
      setBuyerMessages([...buyerMessages, { sender: "Admin", text: newBuyerMessage, type: "admin" }]);
      setNewBuyerMessage(""); // Clear input
    }
  };

  return (
    <div className="chat-rooms-container">
      <div className="chat-rooms">
        {/* Employees Chat Room */}
        <div className="chat-room">
          <h2>Employees Chat</h2>
          <div className="chat-box" ref={employeeChatRef}>
            {employeeMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className="chat-bubble">
                  {msg.type === "admin" ? <FaUserShield className="chat-icon admin-icon" /> : <FaUser className="chat-icon user-icon" />}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newEmployeeMessage}
              onChange={(e) => setNewEmployeeMessage(e.target.value)}
            />
            <button onClick={() => sendMessage("employee")}>
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Buyers Chat Room */}
        <div className="chat-room">
          <h2>Buyers Chat</h2>
          <div className="chat-box" ref={buyerChatRef}>
            {buyerMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className="chat-bubble">
                  {msg.type === "admin" ? <FaUserShield className="chat-icon admin-icon" /> : <FaUser className="chat-icon user-icon" />}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newBuyerMessage}
              onChange={(e) => setNewBuyerMessage(e.target.value)}
            />
            <button onClick={() => sendMessage("buyer")}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
