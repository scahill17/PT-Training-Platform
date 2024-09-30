import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAthleteDetails, fetchWorkoutSessions } from '../../api/api';
import Calendar from '../../components/calendar/Calendar';
import AthletesDropdown from '../../components/athletes/AthletesDropdown';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import './CalendarPage.css';

const CalendarPage = () => {
  const { athleteId } = useParams();
  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workoutSessions, setWorkoutSessions] = useState([]);  // Track workout sessions
  const navigate = useNavigate();

  useEffect(() => {
    const loadAthletes = async () => {
      const athleteData = await fetchAthleteDetails();
      setAthletes(athleteData);

      const athlete = athleteData.find(a => a.athlete_id === parseInt(athleteId));
      if (athlete) {
        setSelectedAthlete(athlete);
      } else {
        setSelectedAthlete(athleteData[0]);
      }
    };

    // Fetch workout sessions here (assuming the API exists)
    const loadWorkoutSessions = async () => {
      const sessions = await fetchWorkoutSessions(athleteId);  // Fetch workout sessions for this athlete
      setWorkoutSessions(sessions);  // Store the sessions
    };

    loadAthletes();
    loadWorkoutSessions();  // Load sessions on page load

  }, [athleteId]);

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
    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}/view`);  // New page for viewing/editing
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

          <AthletesDropdown
            athletes={athletes}
            selectedAthlete={selectedAthlete}
            setSelectedAthlete={setSelectedAthlete}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <Calendar
          date={date}
          hoveredDay={hoveredDay}
          setHoveredDay={setHoveredDay}
          handleEditSessionClick={handleEditSessionClick}
          handleViewSessionClick={handleViewSessionClick}  // Pass new handler for viewing sessions
          workoutSessions={workoutSessions}  // Pass workout sessions to calendar
        />
      </div>
    </div>
  );
};

export default CalendarPage;
