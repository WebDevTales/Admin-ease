import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import '../../styles/Sales/salesProgressAlerts.css';

const SalesProgressAlerts = () => {
  const [sales, setSales] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [alerts, setAlerts] = useState([]);
  const [goals, setGoals] = useState({ daily: 1000, weekly: 7000, monthly: 25000 });
  const [goalMet, setGoalMet] = useState({ daily: false, weekly: false, monthly: false });
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoals, setNewGoals] = useState(goals);

  // Listen to sales collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'sales'), (snapshot) => {
      const now = new Date();
      let daily = 0,
        weekly = 0,
        monthly = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const saleDate = data.movedToSalesAt?.toDate?.();
        if (!saleDate) return;
        const price = parseFloat(data.price) || 0;

        const isToday = saleDate.toDateString() === now.toDateString();
        const isThisWeek = (() => {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return saleDate >= startOfWeek && saleDate <= endOfWeek;
        })();
        const isThisMonth =
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear();

        if (isToday) daily += price;
        if (isThisWeek) weekly += price;
        if (isThisMonth) monthly += price;
      });

      setSales({ daily, weekly, monthly });

      // Check if goals are met and send notifications
      checkGoals(daily, weekly, monthly);
    });

    return () => unsubscribe();
  }, [sales]); // Trigger on sales change

  // Listen to goals document
  useEffect(() => {
    const docRef = doc(db, 'goals', 'default');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGoals(data);
        setNewGoals(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to notifications collection
  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data().message);
      setAlerts(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Check if goals are met
  const checkGoals = (daily, weekly, monthly) => {
    const updated = { ...goalMet };
    ['daily', 'weekly', 'monthly'].forEach((key) => {
      if (sales[key] >= goals[key] && !goalMet[key]) {
        const message = `🎉 ${key.charAt(0).toUpperCase() + key.slice(1)} goal of $${goals[key]} reached!`;
        
        // Add notification
        addDoc(collection(db, 'notifications'), {
          message,
          timestamp: serverTimestamp(),
        })
          .then(() => {
            console.log(`Notification added for ${key} goal`);
          })
          .catch((error) => {
            console.error(`Error adding notification for ${key} goal:`, error);
          });

        updated[key] = true;
      }
    });

    setGoalMet(updated); // Update goal met status
  };

  const getPercentage = (amount, goal) =>
    Math.min(100, Math.round((amount / goal) * 100));

  const handleGoalChange = (e, type) => {
    const value = parseFloat(e.target.value) || 0;
    setNewGoals((prev) => ({ ...prev, [type]: value }));
  };

  const saveGoals = async () => {
    const docRef = doc(db, 'goals', 'default');
    try {
      await setDoc(docRef, newGoals);
      const message = `📌 Goals updated: Daily $${newGoals.daily}, Weekly $${newGoals.weekly}, Monthly $${newGoals.monthly}`;
      await addDoc(collection(db, 'notifications'), {
        message,
        timestamp: serverTimestamp(),
      });
      console.log('Goals updated and notification added');
    } catch (error) {
      console.error('Error updating goals:', error);
    }
    setShowGoalModal(false);
  };

  const clearNotifications = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'notifications'));
      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const circleColors = {
    daily: '#f43676',
    weekly: '#36b9cc',
    monthly: '#1cc88a',
  };

  return (
    <div className="sales-progress-alerts">
      <h2>Sales Tracker</h2>
      <div className="row-layout">
        <div className="progress-section">
          <div className="circles-row">
            {['daily', 'weekly', 'monthly'].map((key) => (
              <div className="circle-wrapper" key={key}>
                <div className="progress-circle">
                  <svg viewBox="0 0 36 36">
                    <path
                      className="bg"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="progress"
                      stroke={circleColors[key]}
                      strokeDasharray={`${getPercentage(sales[key], goals[key])}, 100`}
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {getPercentage(sales[key], goals[key])}%
                    </text>
                  </svg>
                </div>
                <p>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: ${sales[key].toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="update-goals-container">
            <button className="update-goals-button" onClick={() => setShowGoalModal(true)}>
              Update Goals
            </button>
          </div>
        </div>

        <div className="alerts-box">
          <h3>Notifications</h3>
          <button className="clear-button" onClick={clearNotifications}>
            Clear All
          </button>
          {alerts.length > 0 ? (
            alerts.map((msg, idx) => (
              <div key={idx} className={`alert-msg color-${idx % 5}`}>
                {msg}
              </div>
            ))
          ) : (
            <p className="no-alert">No alerts yet.</p>
          )}
        </div>
      </div>

      {showGoalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Goals</h3>
            {['daily', 'weekly', 'monthly'].map((key) => (
              <div key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)} Goal:</label>
                <input
                  type="number"
                  value={newGoals[key]}
                  onChange={(e) => handleGoalChange(e, key)}
                />
              </div>
            ))}
            <button onClick={saveGoals}>Save</button>
            <button onClick={() => setShowGoalModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesProgressAlerts;
