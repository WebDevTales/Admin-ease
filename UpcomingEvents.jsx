import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../../styles/Profile/UpcomingEvents.css'; // Changed CSS file name

const STATUS_COLORS = {
  'In Progress': '#007bff',
  'Completed': '#28a745',
  'Canceled': '#dc3545',
};

const UpcomingEvents = () => { // Changed component name
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingCancel, setPendingCancel] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter out past events and sort by date
      const now = new Date();
      const upcoming = data
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 6); // Only take the next 6 events
      
      setEvents(data);
      setUpcomingEvents(upcoming);
    };

    fetchEvents();
  }, []);

  const confirmCancel = (id) => {
    setPendingCancel(id);
    setShowConfirm(true);
  };

  const handleCancelConfirmed = async () => {
    const id = pendingCancel;
    const eventRef = doc(db, 'events', id);
    await updateDoc(eventRef, { status: 'Canceled' });
    
    // Update both all events and upcoming events
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, status: 'Canceled' } : e))
    );
    
    setUpcomingEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, status: 'Canceled' } : e))
    );
    
    setShowConfirm(false);
    setPendingCancel(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    const event = events.find(e => e.id === id);

    if (event.status === 'Canceled') return;

    if (newStatus === 'Canceled') {
      confirmCancel(id);
      return;
    }

    const eventRef = doc(db, 'events', id);
    await updateDoc(eventRef, { status: newStatus });
    
    // Update both all events and upcoming events
    // Update both all events and upcoming events
setEvents(prev =>
    prev.map(e => (e.id === id ? { ...e, status: newStatus } : e))
  );
  
  setUpcomingEvents(prev =>
    prev.map(e => (e.id === id ? { ...e, status: newStatus } : e))
  );
  
  };

  return (
    <>
      <div className="upcoming-events-container"> {/* Changed class name */}
        <h2 className="upcoming-events-title">Upcoming Events</h2> {/* Added title */}
        <div className="upcoming-events-list">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div
                key={event.id}
                className={`event-card ${event.status.toLowerCase().replace(' ', '-')}`}
                style={{
                  borderTopColor: STATUS_COLORS[event.status],
                  opacity: event.status === 'Canceled' ? 0.6 : 1,
                  pointerEvents: event.status === 'Canceled' ? 'none' : 'auto',
                }}
              >
                <h3 className='eventicon' style={{ color: STATUS_COLORS[event.status] }}>{event.icon}</h3>
                <h4 style={{ color: STATUS_COLORS[event.status] }}>{event.title}</h4>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <div className="status-control">
                  <label>Status:</label>
                  <select
                    value={event.status}
                    onChange={(e) => handleStatusChange(event.id, e.target.value)}
                    disabled={event.status === 'Canceled'}
                  >
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Canceled</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events-message">
              No upcoming events scheduled
            </div>
          )}
        </div>
      </div>

      {/* Custom Confirmation Popup */}
      {showConfirm && (
        <div className="cancel-popup-backdrop">
          <div className="cancel-popup">
            <h3>Cancel Event?</h3>
            <p>This action is irreversible. Are you sure you want to cancel this event?</p>
            <div className="popup-buttons">
              <button className="btn cancel" onClick={() => setShowConfirm(false)}>No</button>
              <button className="btn confirm" onClick={handleCancelConfirmed}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents; // Changed export name