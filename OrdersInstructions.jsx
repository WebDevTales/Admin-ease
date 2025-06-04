import React from 'react';
import { FaInfoCircle, FaClock, FaTruck, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import '../../styles/Orders/ordersInstructions.css';

const OrdersInstructions = () => {
  return (
    <div className="instructions-container">
      <div className="instructions-header">
        <FaInfoCircle className="header-icon" />
        <h3>Order Management Guide</h3>
      </div>
      
      <div className="instructions-grid">
        {/* Pending Orders */}
        <div className="instruction-card pending">
          <div className="card-header">
            <FaClock className="card-icon" />
            <h4>Pending Orders</h4>
          </div>
          <ul>
            <li>Review new orders within 24 hours</li>
            <li>Contact customer if additional information is needed</li>
            <li>Update status when processing begins</li>
          </ul>
        </div>

        {/* On the Way Orders */}
        <div className="instruction-card onway">
          <div className="card-header">
            <FaTruck className="card-icon" />
            <h4>Shipping Orders</h4>
          </div>
          <ul>
            <li>Ensure tracking numbers are updated</li>
            <li>Monitor for delivery exceptions</li>
            <li>Follow up if delivery is delayed</li>
          </ul>
        </div>

        {/* Completed Orders */}
        <div className="instruction-card completed">
          <div className="card-header">
            <FaCheckCircle className="card-icon" />
            <h4>Completed Orders</h4>
          </div>
          <ul>
            <li>Send delivery confirmation to customer</li>
            <li>Request product reviews after 3 days</li>
            <li>Archive order records after 30 days</li>
          </ul>
        </div>

        {/* Important Notes */}
        <div className="instruction-card important">
          <div className="card-header">
            <FaExclamationTriangle className="card-icon" />
            <h4>Important Notes</h4>
          </div>
          <ul>
            <li>Always verify payment before shipping</li>
            <li>Priority handling for VIP customers</li>
            <li>Document all customer interactions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrdersInstructions;