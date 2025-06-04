import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import "../../styles/Charts/ChartsWelcomeBanner.css";

const ChartsWelcomeBanner = () => {
  const [userName, setUserName] = useState("...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const name = userSnap.data().name || "User";
            setUserName(name.split(" ")[0]); // Show only first name
          } else {
            setUserName("User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName("User");
        }
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="charts-premium-banner">
      <div className="banner-content-wrapper">
        <div className="banner-text-content">
          <h1>
            <span className="chart-icon">📊</span> Welcome,{" "}
            <span className="user-name-glow">{userName}</span>
          </h1>
          <p className="banner-subtext">
            Your <span className="highlight">sales analytics dashboard</span> is ready. 
            Dive deep into the metrics that matter and uncover insights to{" "}
            <span className="highlight">drive growth</span>.
          </p>
          <div className="data-stats-preview">
            <div className="stat-item">
              <div className="stat-value">24.7%</div>
              <div className="stat-label">Avg. Growth</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">158</div>
              <div className="stat-label">New Leads</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">$12.4K</div>
              <div className="stat-label">Revenue</div>
            </div>
          </div>
        </div>
        <div className="banner-visual">
          <div className="chart-mockup">
            <div className="chart-bar" style={{ height: "70%" }}></div>
            <div className="chart-bar" style={{ height: "90%" }}></div>
            <div className="chart-bar" style={{ height: "60%" }}></div>
            <div className="chart-bar" style={{ height: "85%" }}></div>
            <div className="chart-bar" style={{ height: "75%" }}></div>
          </div>
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </div>
      </div>
      <div className="banner-cta">
        <button className="analyze-btn">
          Analyze Data <span className="arrow-icon">→</span>
        </button>
        <button className="export-btn">
          Export Report <span className="download-icon">↓</span>
        </button>
      </div>
    </div>
  );
};

export default ChartsWelcomeBanner;