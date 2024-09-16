// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Global/NavBar';
import SideBar from './components/Global/SideBar';
import HomePage from './pages/HomePage';
import AthletesPage from './pages/AthletesPage';
import CalendarPage from './pages/CalendarPage';
import ChatPage from './pages/ChatPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <SideBar />
        <NavBar />
          <div className="page-content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/athlete/:athleteId/calendar" element={<CalendarPage />} />
              </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
