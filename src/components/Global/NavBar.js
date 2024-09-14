import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../../assets/User Profile.png';
import DownArrow from '../../assets/Down Arrow.png';
import '../../styles/NavBar.css'; // Updated CSS

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">


      {/* Welcome Text */}
      <div className="navbar-text">
        Welcome back, Coach
      </div>

      {/* Profile & Dropdown */}
      <div
        className="navbar-profile"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <img src={UserProfile} alt="User Profile" className="user-icon" />
        <img src={DownArrow} alt="Dropdown Arrow" className="dropdown-arrow" />
        {dropdownVisible && (
          <div className="dropdown-menu">
            <Link to="/account" className="dropdown-item">Account</Link>
            <Link to="/login" className="dropdown-item">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
