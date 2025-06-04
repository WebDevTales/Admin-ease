import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../../styles/Calendar/EventList.css';

const STATUS_COLORS = {
  'In Progress': '#007bff',
  'Completed': '#28a745',
  'Canceled': '#dc3545',
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingCancel, setPendingCancel] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(data);
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
    setEvents(prev =>
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
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <>
      <div className="event-list">
        {events.map(event => (
          <div
            key={event.id}
            className={`event-card ${event.status.toLowerCase().replace(' ', '-')}`}
            style={{
              borderTopColor: STATUS_COLORS[event.status],
              opacity: event.status === 'Canceled' ? 0.6 : 1,
              pointerEvents: event.status === 'Canceled' ? 'none' : 'auto',
            }}
          >
            <h3 className='eventicon' style={{ color: STATUS_COLORS[event.status] }} >{event.icon}</h3>
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
        ))}
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

export default EventList;
