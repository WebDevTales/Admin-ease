import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import "../../styles/Sales/salesCharts.css";

const COLORS = ['#4e73df', '#1cc88a', '#f6c23e'];
const LABELS = ['Daily', 'Monthly', 'Yearly'];

const SalesCharts = () => {
  const [salesData, setSalesData] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0
  });

  useEffect(() => {
    const salesRef = collection(db, 'sales');
    const unsubscribe = onSnapshot(salesRef, (snapshot) => {
      const now = new Date();

      let daily = 0;
      let monthly = 0;
      let yearly = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const saleDate = data.movedToSalesAt?.toDate?.();

        if (!saleDate || isNaN(saleDate)) return;

        const salePrice = parseFloat(data.price) || 0;

        if (saleDate.toDateString() === now.toDateString()) daily += salePrice;
        if (saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear()) monthly += salePrice;
        if (saleDate.getFullYear() === now.getFullYear()) yearly += salePrice;
      });

      setSalesData({ daily, monthly, yearly });
    });

    return () => unsubscribe();
  }, []);

  const chartData = [
    { name: 'Daily', value: salesData.daily },
    { name: 'Monthly', value: salesData.monthly },
    { name: 'Yearly', value: salesData.yearly }
  ];

  return (
    <div className="sales-charts-wrapper">
      {/* Pie Chart */}
      <div className="chart-container">
        <h3>Total Sales - Pie Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="custom-legend">
          {chartData.map((entry, index) => (
            <div className="legend-item" key={entry.name}>
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="legend-label">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Total Sales - Bar Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            {/* Removed built-in Legend */}
            <Bar dataKey="value">
              {chartData.map((_, index) => (
                <Cell key={`bar-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="custom-legend">
          {chartData.map((entry, index) => (
            <div className="legend-item" key={entry.name}>
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="legend-label">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;
