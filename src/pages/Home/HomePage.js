import React from 'react';
import NavBar from '../../components/common/NavBar'; 
import SideBar from '../../components/common/SideBar'; 
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <SideBar />
      <NavBar />

      <div className="home-content">
        <h1>Welcome to the PT Training Platform</h1>
        <p className="intro-text">
          Manage your athletes, track progress, and monitor performance all in one place.
        </p>

        <div className="card-container">
          <div className="feature-card">
            <h2>Athletes</h2>
            <p>View and manage all your athletes.</p>
            <button onClick={() => window.location.href = '/athletes'}>Go to Athletes</button>
          </div>

          <div className="feature-card">
            <h2>Chat</h2>
            <p>Communicate with your athletes directly.</p>
            <button onClick={() => window.location.href = '/chat'}>Go to Chat</button>
          </div>

          <div className="feature-card">
            <h2>Analytics</h2>
            <p>View detailed performance analytics and insights.</p>
            <button onClick={() => window.location.href = '/analytics'}>Go to Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
