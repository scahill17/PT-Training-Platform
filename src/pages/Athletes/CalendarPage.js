import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAthleteDetails, fetchWorkoutSessions } from '../../api/api';
import Calendar from '../../components/calendar/Calendar';
import AthletesDropdown from '../../components/athletes/AthletesDropdown';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import './CalendarPage.css';

/**
 * CalendarPage component - Displays a calendar view of workout sessions for a selected athlete
 */
const CalendarPage = () => {
  const { athleteId } = useParams();
  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workoutSessions, setWorkoutSessions] = useState([]);  // Track workout sessions
  const navigate = useNavigate();

  // Load athlete data and workout sessions
  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const athleteData = await fetchAthleteDetails();
        setAthletes(athleteData);
        const athlete = athleteData.find((a) => a.athlete_id === parseInt(athleteId));
        setSelectedAthlete(athlete || athleteData[0]);
      } catch (error) {
        console.error('Error fetching athlete details:', error);
      }
    };

    const loadWorkoutSessions = async () => {
      try {
        const sessions = await fetchWorkoutSessions(athleteId);
        setWorkoutSessions(sessions);
      } catch (error) {
        console.error('Error fetching workout sessions:', error);
      }
    };

    loadAthletes();
    loadWorkoutSessions();
  }, [athleteId]);

  // Handlers for navigating the calendar
  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handleTodayClick = () => setDate(new Date());

  // Navigate to the Create Session page
  const handleEditSessionClick = (day) => {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const year = date.getFullYear();
    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}`);
  };

  // Navigate to the View/Edit Session page
  const handleViewSessionClick = (day) => {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const year = date.getFullYear();
    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}/view`);
  };

  return (
    <div className="calendar-page">
      <SideBar />
      <NavBar />
      <div className="calendar-content">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="nav-button">‹</button>
          <button onClick={handleNextMonth} className="nav-button">›</button>
          <span className="month-year">{date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
          <button onClick={handleTodayClick} className="today-button">Today</button>

          {/* Athlete dropdown for selection */}
          <AthletesDropdown
            athletes={athletes}
            selectedAthlete={selectedAthlete}
            setSelectedAthlete={setSelectedAthlete}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>

        {/* Weekdays */}
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        {/* Calendar component with workout session data */}
        <Calendar
          date={date}
          hoveredDay={hoveredDay}
          setHoveredDay={setHoveredDay}
          handleEditSessionClick={handleEditSessionClick}
          handleViewSessionClick={handleViewSessionClick}
          workoutSessions={workoutSessions}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
