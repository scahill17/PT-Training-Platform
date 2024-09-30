import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AthletesPage from './pages/AthletesPage';
import CalendarPage from './pages/CalendarPage';
import AnalyticsHomePage from './pages/AnalyticsHomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AccountPage from './pages/AccountPage';
import LoginSignupPage from './pages/LoginSignupPage';
import ChatPage from './pages/ChatPage';
import './App.css';
import AddWorkoutSessionsPage from './pages/AddWorkoutSessions';
import ViewWorkoutPage from './pages/ViewWorkoutPage';

function App() {
  
  return (
    <Router>
      <div className="app-layout">
          <div className="page-content">
            <Routes>
                <Route path="/" element={<LoginSignupPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/analytics" element={<AnalyticsHomePage />} />
                <Route path="/analytics/:athleteId" element={<AnalyticsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/athlete/:athleteId/calendar" element={<CalendarPage />} />
                <Route path="/chat/:athleteId" element={<ChatPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/athlete/:athleteID/calendar/:day/:month/:year" element={<AddWorkoutSessionsPage />} />
                <Route path="/athlete/:athleteID/calendar/:day/:month/:year/view" element={<ViewWorkoutPage />} />
              </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
