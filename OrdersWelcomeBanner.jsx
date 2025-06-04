import React from 'react';
import { FaBoxOpen, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import '../../styles/Orders/ordersWelcomeBanner.css';

const OrdersWelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h2>Order Management</h2>
          <p className="banner-subtitle">
            Track, manage, and analyze all your orders in one place
          </p>
          <div className="banner-features">
            <div className="feature">
              <FaBoxOpen className="feature-icon" />
              <span>Real-time order tracking</span>
            </div>
            <div className="feature">
              <FaChartLine className="feature-icon" />
              <span>Visual analytics</span>
            </div>
            <div className="feature">
              <FaClipboardCheck className="feature-icon" />
              <span>Efficient processing</span>
            </div>
          </div>
        </div>
        <div className="banner-graphic">
          <div className="graphic-circle">
            <div className="inner-circle">
              <FaBoxOpen className="main-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersWelcomeBanner;