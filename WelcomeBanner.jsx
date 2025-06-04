import React, { useEffect, useState } from "react";
import { FaUser, FaChartLine, FaCog } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // adjust the path if needed
import "../../styles/Dashboard/welcomeBanner.css";

const WelcomeBanner = () => {
  const [userName, setUserName] = useState("...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const name = userSnap.data().name || "User";
            setUserName(name);
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
    <div className="welcome-banner">
      <div className="welcome-text">
        <h1>
          Welcome Back, <span>{userName}</span> 👋
        </h1>
        <p>Manage your dashboard efficiently with insights and tools.</p>
        <div className="banner-buttons">
          <button className="btn primary">
            <FaChartLine /> View Stats
          </button>
          <button className="btn secondary">
            <FaCog /> Settings
          </button>
        </div>
      </div>
      <div className="welcome-icon">
        <FaUser className="user-icon" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
