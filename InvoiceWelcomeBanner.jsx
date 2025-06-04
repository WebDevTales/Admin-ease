import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import "../../styles/Invoices/InvoiceWelcomeBanner.css";

const InvoiceWelcomeBanner = () => {
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
    <div className="premium-welcome-banner">
      <div className="welcome-content">
        <div className="welcome-text">
          <h2>
            Welcome Back, <span className="highlight-name">{userName}</span>
          </h2>
          <p className="subtext">Ready to streamline your invoicing today?</p>
        </div>
        <div className="welcome-graphic">
          <div className="graphic-element graphic-1"></div>
          <div className="graphic-element graphic-2"></div>
          <div className="graphic-element graphic-3"></div>
          <div className="welcome-icon">👋</div>
        </div>
      </div>
      <div className="action-prompt">
        <button className="cta-button">Create New Invoice</button>
        <span className="or-text">or</span>
        <button className="secondary-button">View Dashboard</button>
      </div>
    </div>
  );
};

export default InvoiceWelcomeBanner;