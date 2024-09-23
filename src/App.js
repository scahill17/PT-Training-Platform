// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AthletesPage from './pages/AthletesPage';
import CalendarPage from './pages/CalendarPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AccountPage from './pages/AccountPage';
import LoginSignupPage from './pages/LoginSignupPage';
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="app-layout">
          <div className="page-content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<LoginSignupPage />} />
                <Route path="/athlete/:athleteId/calendar" element={<CalendarPage />} />
              </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
