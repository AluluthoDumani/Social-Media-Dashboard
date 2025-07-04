import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Zap } from 'lucide-react';

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = `Post #${Math.floor(Math.random() * 1000)} is trending!`;
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerts-container">
      <div className="flex items-center mb-3">
        <Zap className="text-yellow-400 mr-2" />
        <h3 className="section-title">Real-Time Alerts</h3>
      </div>
      
      {alerts.length === 0 ? (
        <div className="no-alerts">
          <TrendingUp className="mx-auto mb-2" size={24} />
          <p>No trending alerts yet</p>
        </div>
      ) : (
        <ul className="alerts-list">
          {alerts.map((alert, index) => (
            <li 
              key={index} 
              className="alert-item"
            >
              <AlertCircle className="alert-icon" size={18} />
              <span>{alert}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RealTimeAlerts;