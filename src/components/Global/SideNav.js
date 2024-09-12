// src/components/SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <nav className="side-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/athletes">Athletes</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </nav>
  );
};

export default SideNav;
