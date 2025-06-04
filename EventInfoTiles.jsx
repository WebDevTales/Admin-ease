import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Adjust path as needed
import { FaCalendarAlt, FaClock, FaHistory, FaShapes } from "react-icons/fa";
import "../../styles/Calendar/EventInfoTiles.css"; // Create this CSS

const EventInfoTiles = () => {
  const [info, setInfo] = useState({
    total: 0,
    upcoming: 0,
    past: 0,
    types: 0,
  });

  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map(doc => doc.data());

        const now = new Date();
        const typesSet = new Set();

        let total = 0, upcoming = 0, past = 0;

        events.forEach(event => {
          const date = event.date ? new Date(event.date) : null;
          if (!date || isNaN(date)) return;

          total++;
          if (date > now) upcoming++;
          else past++;

          if (event.type) typesSet.add(event.type);
        });

        setInfo({
          total,
          upcoming,
          past,
          types: typesSet.size,
        });
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEventStats();
  }, []);

  return (
    <div className="event-info-tiles">
      <div className="tile total">
        <FaCalendarAlt className="tile-icon" />
        <div>
          <h4>{info.total}</h4>
          <p>Total Events</p>
        </div>
      </div>

      <div className="tile upcoming">
        <FaClock className="tile-icon" />
        <div>
          <h4>{info.upcoming}</h4>
          <p>Upcoming Events</p>
        </div>
      </div>

      <div className="tile past">
        <FaHistory className="tile-icon" />
        <div>
          <h4>{info.past}</h4>
          <p>Past Events</p>
        </div>
      </div>

      <div className="tile types">
        <FaShapes className="tile-icon" />
        <div>
          <h4>{info.types}</h4>
          <p>Event Types</p>
        </div>
      </div>
    </div>
  );
};

export default EventInfoTiles;
