import React, { useState, useEffect } from 'react';
import './App.css';
import FollowerChart from './components/Charts/FollowerChart';
import EngagementChart from './components/Charts/EngagemnetChart';
import GoalProgress from './components/Progress/GoalProgress';
import RealTimeAlerts from './components/Alerts/RealTimeAlerts';
import TodoList from './components/Todo/TodoList';

import { addSampleData } from './services/dataService';

// Example mock data fetching (replace with real data fetching as needed)
const mockFollowerData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [1150, 1180, 1200, 1220, 1205, 1234, 1250],
};
const mockEngagementData = {
  labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Mentions'],
  data: [320, 150, 80, 60, 40],
};

function App() {
  const [followerData, setFollowerData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [engagementData, setEngagementData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [goals] = useState({
    followers: { current: 1234, target: 1500 },
    engagement: { current: 3.2, target: 4.5 },
    posts: { current: 567, target: 600 }
  });

  useEffect(() => {
    setFollowerData(mockFollowerData);
    setEngagementData(mockEngagementData);
  }, []);

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

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li
                className={activeTab === 'analytics' ? 'active' : ''}
                onClick={() => setActiveTab('analytics')}
              >
                📈 Analytics
              </li>
              <li
                className={activeTab === 'posts' ? 'active' : ''}
                onClick={() => setActiveTab('posts')}
              >
                📱 Posts
              </li>
              <li
                className={activeTab === 'followers' ? 'active' : ''}
                onClick={() => setActiveTab('followers')}
              >
                👥 Followers
              </li>
              <li
                className={activeTab === 'messages' ? 'active' : ''}
                onClick={() => setActiveTab('messages')}
              >
                💬 Messages
              </li>
              <li
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Settings
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (updated layout) */}
        <main className="main-content">
          {/* Stats Grid */}
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
          
          {/* Main Content Area */}
          <div className="content-area" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {/* Left Column */}
            <div className="left-column" style={{ flex: 2, minWidth: 0 }}>
              {/* Goals Section */}
              <div className="goals-section">
                <h3 className="section-title">Daily Goals</h3>
                <GoalProgress 
                  title="Follower Target" 
                  current={goals.followers.current} 
                  target={goals.followers.target} 
                  color="#667eea" 
                />
                <GoalProgress 
                  title="Engagement Rate" 
                  current={goals.engagement.current} 
                  target={goals.engagement.target} 
                  color="#10b981" 
                />
                <GoalProgress 
                  title="Post Creation" 
                  current={goals.posts.current} 
                  target={goals.posts.target} 
                  color="#f59e0b" 
                />
              </div>
              
              {/* Charts Section */}
              <div className="charts-section">
                <div className="chart-container">
                  <h3>📊 Follower Growth</h3>
                  {followerData && (
                    <FollowerChart data={{
                      labels: followerData.labels,
                      datasets: [{
                        label: 'Followers',
                        data: followerData.data,
                        borderColor: 'rgb(102, 126, 234)',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                      }]
                    }} />
                  )}
                </div>
                <div className="chart-container">
                  <h3>📈 Engagement Trends</h3>
                  {engagementData && (
                    <EngagementChart data={{
                      labels: engagementData.labels,
                      datasets: [{
                        label: 'Engagement',
                        data: engagementData.data,
                        backgroundColor: [
                          'rgba(40, 40, 40, 0.8)',    // Dark grey
                          'rgba(60, 60, 60, 0.8)',    // Medium grey
                          'rgba(80, 80, 80, 0.8)',    // Light grey
                          'rgba(100, 100, 100, 0.8)', // Lighter grey
                          'rgba(120, 120, 120, 0.8)'  // Lightest grey
                        ],
                        borderColor: [
                          'rgba(200, 200, 200, 1)',
                          'rgba(200, 200, 200, 1)',
                          'rgba(200, 200, 200, 1)',
                          'rgba(200, 200, 200, 1)',
                          'rgba(200, 200, 200, 1)',
                        ],
                        borderWidth: 1
                      }]
                    }} />
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="right-column" style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <RealTimeAlerts />
              <TodoList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;