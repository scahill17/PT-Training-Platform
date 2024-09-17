import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from '../../assets/User Profile.png';
import DownArrow from '../../assets/Down Arrow.png';
import LogoutIcon from '../../assets/Logout Icon.png';
import '../../styles/NavBar.css'; // Updated CSS

const NavBar = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const getWelcomeMessage = () => {
    switch (location.pathname) {
      case '/':
        return 'Welcome back, Coach';
      case '/athletes':
        return 'My Athletes';
      case '/analytics':
        return 'Analytics';
      case '/chat':
        return 'Messaging';
      case '/account':
        return 'Account';
      default:
        return 'Welcome back, Coach';
    }
  };

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
            <Link to="/login" className="dropdown-item">
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