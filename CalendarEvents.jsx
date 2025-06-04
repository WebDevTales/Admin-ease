import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import '../../styles/Calendar/CalendarEvents.css';

const CalendarEvents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting',
    status: 'In Progress',
    color: '#4CAF50'
  });

  const eventTypes = {
    meeting: '📅',
    call: '📞',
    reminder: '⏰',
    analytics: '📊'
  };

  const statusOptions = ['In Progress', 'Completed', 'Canceled'];

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        dateTime: eventDateTime,
        icon: eventTypes[newEvent.type]
      });
      setShowForm(false);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        type: 'meeting',
        status: 'In Progress',
        color: '#4CAF50'
      });
      showToast('Event added successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to add event', 'error');
    }
  };

  const handleMouseEnter = (event, e) => {
    setHoveredEvent(event);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDay = new Date(year, month, day);
      const dayEvents = events.filter(evt => {
        const evtDate = new Date(evt.dateTime.seconds * 1000);
        return (
          evtDate.getFullYear() === year &&
          evtDate.getMonth() === month &&
          evtDate.getDate() === day
        );
      });

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${thisDay.toDateString() === new Date().toDateString() ? 'today' : ''}`}
        >
          <div className="day-number">{day}</div>
          {dayEvents.length > 0 && (
            <div className="events-indicator">
              {dayEvents.map(evt => (
                <div
                  key={evt.id}
                  className="event-marker"
                  style={{ backgroundColor: evt.color }}
                  onMouseEnter={(e) => handleMouseEnter(evt, e)}
                  onMouseLeave={() => setHoveredEvent(null)}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    const newMonth = new Date(currentDate.setMonth(currentDate.getMonth() + increment));
    setCurrentDate(newMonth);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt; Prev</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => changeMonth(1)}>Next &gt;</button>
        <button className="add-event-btn" onClick={() => setShowForm(true)}>Add Event</button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">{renderDays()}</div>
      </div>

      {showForm && (
        <div className="popup-overlay">
          <div className="event-form">
            <h3>Add New Event</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <select name="type" value={newEvent.type} onChange={handleInputChange}>
                  {Object.entries(eventTypes).map(([key, icon]) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select name="status" value={newEvent.status} onChange={handleInputChange}>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Color:</label>
                <input type="color" name="color" value={newEvent.color} onChange={handleInputChange} />
              </div>
              <button type="submit" className="submit-btn">Save Event</button>
            </form>
          </div>
        </div>
      )}

      {hoveredEvent && (
        <div
          className="event-tooltip"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`
          }}
        >
          <div className="tooltip-header">
            <span className="tooltip-icon">{hoveredEvent.icon}</span>
            <h4>{hoveredEvent.title}</h4>
          </div>
          <p>Type: {hoveredEvent.type}</p>
          <p>Date: {new Date(hoveredEvent.dateTime.seconds * 1000).toLocaleDateString()}</p>
          <p>Time: {new Date(hoveredEvent.dateTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p>Status: <span style={{ color: hoveredEvent.color }}>{hoveredEvent.status}</span></p>
        </div>
      )}

      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default CalendarEvents;
