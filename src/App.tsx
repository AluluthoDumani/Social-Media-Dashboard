import React from 'react';
import './App.css';
import FollowerChart from './components/Charts/FollowerChart'
import EngagementChart from './components/Charts/EngagemnetChart';

import { addSampleData } from './services/dataService';

function App() {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>📊 Social Media Dashboard</h1>
        <div className="user-info">
          <span>Welcome back, User!</span>
          <button 
            onClick={addSampleData} 
            style={{
              padding: '10px 15px', 
              backgroundColor: 'white', 
              color: '#667eea', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginLeft: '15px',
              fontWeight: 'bold'
            }}
          >
            Test Firebase
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li>📈 Analytics</li>
              <li>📱 Posts</li>
              <li>👥 Followers</li>
              <li>💬 Messages</li>
              <li>⚙️ Settings</li>
            </ul>
          </nav>
        </aside>

        {/* Main Dashboard Area */}
        <main className="main-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Followers</h3>
              <p className="stat-number">1,234</p>
              <span className="stat-change">+12% this month</span>
            </div>
            
            <div className="stat-card">
              <h3>Total Posts</h3>
              <p className="stat-number">567</p>
              <span className="stat-change">+5 this week</span>
            </div>
            
            <div className="stat-card">
              <h3>Engagement Rate</h3>
              <p className="stat-number">3.2%</p>
              <span className="stat-change">+0.5% this month</span>
            </div>
            
            <div className="stat-card">
              <h3>Total Likes</h3>
              <p className="stat-number">8,901</p>
              <span className="stat-change">+15% this month</span>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>📊 Follower Growth</h3>
              <FollowerChart />
            </div>
            
            <div className="chart-container">
              <h3>📈 Engagement Trends</h3>
              <EngagementChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;