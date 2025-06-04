import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, provider, db } from "../firebase/firebaseConfig";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaGoogle,
} from "react-icons/fa";
import "../styles/auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: serverTimestamp(),
      });

      showNotification("Account created successfully!", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optional: Store user data on first sign-in if it doesn't exist
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        phone: user.phoneNumber || "",
        createdAt: serverTimestamp(),
      }, { merge: true });

      showNotification("Google sign-in successful!", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <div className="auth-container">
      {notification.message && (
        <div className={`custom-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className={`auth-card ${isSignUp ? "flipped" : ""}`}>
        <div className="form-container sign-in">
          <div className="form-content">
            <div className="formlogo">
              <img src="/img/admin ease.png" alt="Admin Ease" />
            </div>
            <h2>Welcome Back</h2>
            <form onSubmit={handleSignIn}>
              <div className="input-box">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Sign In</button>
              <p className="toggle-text" onClick={toggleForm}>
                Don't have an account? <span>Sign Up</span>
              </p>
            </form>
            <h4 className="or">Or</h4>
            <div className="google-login">
              <button className="googlelink" onClick={handleGoogleSignIn}>
                <FaGoogle className="icon" /> Sign in with Google
              </button>
            </div>
          </div>
          <div className="image-container sign-in-image"></div>
        </div>

        <div className="form-container sign-up">
          <div className="form-content">
            <h2>Create an Account</h2>
            <form onSubmit={handleSignUp}>
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit">Sign Up</button>
              <p className="toggle-text" onClick={toggleForm}>
                Already have an account? <span>Sign In</span>
              </p>
            </form>
          </div>
          <div className="image-container sign-up-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
