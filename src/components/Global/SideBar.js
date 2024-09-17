import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import ProgressionLogo from '../../assets/Progression Logo.png';
import HomeIcon from '../../assets/Home Icon.png';
import AthletesIcon from '../../assets/Athletes Icon.png';
import ChatIcon from '../../assets/Chat Icon.png';
import AnalyticsIcon from '../../assets/Analytics Icon.png';
import '../../styles/SideBar.css';


const SideBar = () => {
  const location = useLocation();
  const isAthletePage = location.pathname.includes('/athlete');
  const isAnalyticsPage = location.pathname.includes('/analytics');
  const isChatPage = location.pathname.includes('/chat');

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/">
          <img src={ProgressionLogo} alt="Progression Logo" />
        </NavLink>
      </div>

      <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
        <img src={HomeIcon} alt="Home" className="sidebar-icon" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/athletes" className={({ isActive }) => isAthletePage ? 'sidebar-item active' : 'sidebar-item'}>
        <img src={AthletesIcon} alt="Athletes" className="sidebar-icon" />
        <span>Athletes</span>
      </NavLink>

      <NavLink to="/chat" className={({ isActive }) => isChatPage ? 'sidebar-item active' : 'sidebar-item'}>
        <img src={ChatIcon} alt="Chat" className="sidebar-icon" />
        <span>Chat</span>
      </NavLink>

      <NavLink to="/analytics" className={({ isActive }) => isAnalyticsPage ? 'sidebar-item active' : 'sidebar-item'}>
        <img src={AnalyticsIcon} alt="Analytics" className="sidebar-icon" />
        <span>Analytics</span>
      </NavLink>
    </div>
  );
};

export default SideBar;