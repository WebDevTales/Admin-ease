import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/Orders/ordersCharts.css';

const OrdersCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [containerKey, setContainerKey] = useState(0); // For forcing re-render
  
  // Premium color scheme
  const COLORS = {
    total: '#4e73df',
    pending: '#f6c23e',
    onTheWay: '#36b9cc',
    completed: '#1cc88a'
  };

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const counts = {
        total: 0,
        pending: 0,
        onTheWay: 0,
        completed: 0
      };

      snapshot.forEach((doc) => {
        counts.total++;
        const status = doc.data().status?.toLowerCase();
        if (status === 'pending') counts.pending++;
        else if (status === 'shipped' || status === 'on the way') counts.onTheWay++;
        else if (status === 'completed' || status === 'delivered') counts.completed++;
      });

      const formattedData = [
        { name: 'Total', value: counts.total, type: 'total' },
        { name: 'Pending', value: counts.pending, type: 'pending' },
        { name: 'On the Way', value: counts.onTheWay, type: 'onTheWay' },
        { name: 'Completed', value: counts.completed, type: 'completed' }
      ];

      setChartData(formattedData);
      setContainerKey(prev => prev + 1); // Force chart resize after data load
    });

    // Handle initial resize
    const handleResize = () => {
      setContainerKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="charts-premium-container">
      <div className="chart-premium-wrapper">
        <div className="chart-header">
          <h3>Orders Status Overview</h3>
          <div className="chart-legend">
            {chartData.map((item) => (
              <div key={item.type} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS[item.type] }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer key={`bar-${containerKey}`} width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6c757d' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <YAxis 
                tick={{ fill: '#6c757d' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.96)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.type]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-premium-wrapper">
        <div className="chart-header">
          <h3>Orders Distribution</h3>
          <div className="chart-legend">
            {chartData.map((item) => (
              <div key={item.type} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS[item.type] }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer key={`pie-${containerKey}`} width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.type]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.96)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrdersCharts;