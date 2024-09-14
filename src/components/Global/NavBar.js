import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../../assets/User Profile.png';
import DownArrow from '../../assets/Down Arrow.png';
// import AccountIcon from '../../assets/Account Icon.png';
import LogoutIcon from '../../assets/Logout Icon.png';
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
