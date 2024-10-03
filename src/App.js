import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AthletesPage from './pages/Athletes/AthletesPage';
import CalendarPage from './pages/Athletes/CalendarPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import AccountPage from './pages/Account/AccountPage';
import LoginSignupPage from './pages/Account/LoginSignupPage';
import ChatPage from './pages/Chat/ChatPage';
import './App.css';
import AddWorkoutSessionsPage from './pages/WorkoutSessions/AddWorkoutSessions';
import ViewWorkoutPage from './pages/WorkoutSessions/ViewWorkoutPage';
import NotFoundPage from './pages/Error/ErrorPage';

function App() {
  
  return (
    <Router>
      <div className="app-layout">
          <div className="page-content">
            <Routes>
                <Route path="/" element={<LoginSignupPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/analytics/:athleteId" element={<AnalyticsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/athlete/:athleteId/calendar" element={<CalendarPage />} />
                <Route path="/chat/:athleteId" element={<ChatPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/athlete/:athleteID/calendar/:day/:month/:year" element={<AddWorkoutSessionsPage />} />
                <Route path="/athlete/:athleteID/calendar/:day/:month/:year/view" element={<ViewWorkoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
