import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // adjust path as needed
import "../../styles/Calendar/CalendarGraphs.css";

const getColor = (value) => {
  if (value >= 7) return "#ff9800";
  if (value >= 5) return "#b9935a";
  return "#ffb3c1";
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGraphs = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map((doc) => doc.data());

        // 1. Group by Day (for Weekly Heatmap)
        const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
        const weeklyTrendMap = {};

        events.forEach((event) => {
          const date = event.date ? new Date(event.date) : null;
          if (!date || isNaN(date)) return;

          const dayName = days[date.getDay()];
          const weekKey = `Week ${getWeekOfMonth(date)}`;

          dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;

          if (!weeklyTrendMap[weekKey]) weeklyTrendMap[weekKey] = 0;
          weeklyTrendMap[weekKey]++;
        });

        const heatmap = days.map((d) => ({
          day: d,
          events: dayCounts[d] || 0,
        }));

        const trends = Object.keys(weeklyTrendMap).map((week) => ({
          week,
          count: weeklyTrendMap[week],
        }));

        trends.sort((a, b) => {
          const w1 = parseInt(a.week.replace("Week ", ""));
          const w2 = parseInt(b.week.replace("Week ", ""));
          return w1 - w2;
        });

        setHeatmapData(heatmap);
        setTrendData(trends);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const getWeekOfMonth = (date) => {
    const adjustedDate = date.getDate() + date.getDay();
    return Math.ceil(adjustedDate / 7);
  };

  return (
    <div className="calendar-graphs">
      <div className="graph-box">
        <h3>📆 Weekly Heatmap</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={heatmapData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="events">
              {heatmapData.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.events)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-box">
        <h3>📈 Event Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ddd" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff9800"
              strokeWidth={8}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalendarGraphs;
