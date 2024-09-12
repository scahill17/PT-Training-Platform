// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>Welcome back, Coach</h2>
      </div>
      <div className="header-right">
        <div className="icon chat-icon">
          <img src="/chat-icon.png" alt="Chat" />
        </div>
        <div className="icon profile-icon">
          <img src="/user-icon.png" alt="Profile" />
        </div>
        <div className="settings-dropdown">
          <button className="settings-btn">Settings</button>
          <div className="dropdown-content">
            <a href="#account">Account</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
