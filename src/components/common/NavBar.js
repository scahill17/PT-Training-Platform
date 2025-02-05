import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from '../../assets/User Profile.png';
import DownArrow from '../../assets/Down Arrow.png';
import LogoutIcon from '../../assets/Logout Icon.png';
import './NavBar.css';

/**
 * NavBar component - Displays the navigation bar with a user profile and dropdown menu
 */
const NavBar = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  /**
   * Returns a welcome message or navigation text based on the current route
   */
  const getWelcomeMessage = () => {
    const path = location.pathname;

    if (path.startsWith('/athletes') || path.startsWith('/athlete/')) {
      return 'My Athletes';
    } else if (path.startsWith('/analytics')) {
      return 'Analytics';
    } else if (path.startsWith('/chat')) {
      return 'Messaging';
    } else if (path.startsWith('/account')) {
      return 'Account';
    } else {
      return 'Welcome back, Coach';
    }
  };

  /**
   * Toggles the visibility of the dropdown menu
   */
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-text">
        {getWelcomeMessage()}
      </div>

      <div
        className="navbar-profile"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <img src={UserProfile} alt="User Profile" className="user-icon" />
        <img src={DownArrow} alt="Dropdown Arrow" className="dropdown-arrow" />
        {dropdownVisible && (
          <div className="dropdown-menu">
            <Link to="/account" className="dropdown-item">
              <img src={UserProfile} alt="Account Icon" className="dropdown-icon" />
              Account
            </Link>
            <Link to="/" className="dropdown-item">
              <img src={LogoutIcon} alt="Logout Icon" className="dropdown-icon" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
