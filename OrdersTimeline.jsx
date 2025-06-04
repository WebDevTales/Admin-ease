import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/Orders/ordersTimeline.css';

const OrdersTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', or 'year'

  // Color scheme matching your design
  const COLORS = {
    total: '#4e73df',
    pending: '#f6c23e',
    onTheWay: '#36b9cc',
    completed: '#1cc88a'
  };

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersByDate = {};
      
      snapshot.forEach((doc) => {
        const orderData = doc.data();
        const orderDate = orderData.createdAt?.toDate() || new Date();
        const dateKey = formatDate(orderDate, timeRange);
        
        if (!ordersByDate[dateKey]) {
          ordersByDate[dateKey] = {
            date: dateKey,
            total: 0,
            pending: 0,
            onTheWay: 0,
            completed: 0
          };
        }
        
        ordersByDate[dateKey].total++;
        const status = orderData.status?.toLowerCase();
        if (status === 'pending') ordersByDate[dateKey].pending++;
        else if (status === 'shipped' || status === 'on the way') ordersByDate[dateKey].onTheWay++;
        else if (status === 'completed' || status === 'delivered') ordersByDate[dateKey].completed++;
      });

      // Convert to array and sort by date
      const formattedData = Object.values(ordersByDate).sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      setTimelineData(formattedData);
    });

    return () => unsubscribe();
  }, [timeRange]);

  const formatDate = (date, range) => {
    const d = new Date(date);
    switch(range) {
      case 'day':
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'week':
        return `Week ${Math.ceil(d.getDate() / 7)} ${d.toLocaleDateString('en-US', { month: 'short' })}`;
      case 'month':
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      case 'year':
        return d.getFullYear().toString();
      default:
        return d.toLocaleDateString();
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h3>Orders Timeline</h3>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
          >
            Weekly
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Monthly
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Yearly
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={timelineData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6c757d' }}
            tickMargin={10}
          />
          <YAxis tick={{ fill: '#6c757d' }} />
          <Tooltip 
            contentStyle={{
              background: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Orders"
            stroke={COLORS.total}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke={COLORS.pending}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="onTheWay"
            name="On the Way"
            stroke={COLORS.onTheWay}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke={COLORS.completed}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersTimeline;