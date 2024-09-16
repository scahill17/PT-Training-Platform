import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { getDaysInMonth } from '../utils/dateUtils';
import { fetchAthleteDetails } from '../api/api'; // Fetch athletes from API
import '../styles/CalendarPage.css';
import DownArrow from '../assets/Down Arrow.png';
import UserProfile from '../assets/User Profile.png';

const CalendarPage = () => {
  const { athleteId } = useParams(); // Get the athleteId from the URL
  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null); // Updated to null initially
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch athlete details on initial load
  useEffect(() => {
    const loadAthletes = async () => {
      const athleteData = await fetchAthleteDetails();
      setAthletes(athleteData);

      // Find the athlete that matches the athleteId from the URL
      const athlete = athleteData.find(a => a.athlete_id === athleteId);
      setSelectedAthlete(athlete);  // Set the selected athlete to the loaded athlete
    };

    loadAthletes();
  }, [athleteId]); // Run this effect whenever the athleteId changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleTodayClick = () => {
    setDate(new Date());
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAthleteSelect = (athlete) => {
    setDropdownOpen(false);
    setSelectedAthlete(athlete); // Update the selected athlete
    navigate(`/athlete/${athlete.athlete_id}/calendar`);  // Navigate to the new athlete's calendar
  };

  const handleEditSessionClick = (day) => {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const year = date.getFullYear();
    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}`);
  };

  const getMonthYearString = () => {
    return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  };

  const getMonthName = (monthIndex) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  };

  const daysInCurrentMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const daysInPrevMonth = getDaysInMonth(prevMonth);

  const calendarDays = [];

  // Fill trailing days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(
      <div key={`prev-${i}`} className="calendar-day trailing">
        {daysInPrevMonth - i}
      </div>
    );
  }

  // Fill current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`calendar-day ${hoveredDay === day ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredDay(day)}  // Set the hovered day
        onMouseLeave={() => setHoveredDay(null)}  // Clear the hovered day
      >
        <div className="date-number">
          {day === 1 ? `${getMonthName(date.getMonth())} ${day}` : day}
        </div>

        {hoveredDay === day && (
          <button className="edit-session-button" onClick={() => handleEditSessionClick(day)}>
            Edit Session
          </button>
        )}
      </div>
    );
  }

  // Fill trailing days from next month
  const totalCells = firstDayOfMonth + daysInCurrentMonth;
  const remainingDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(
      <div key={`next-${i}`} className="calendar-day trailing">
        {i === 1 ? `${getMonthName(nextMonth.getMonth())} ${i}` : i}
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className="calendar-content">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="nav-button">
            <span className="custom-arrow left-arrow">‹</span>
          </button>
          <button onClick={handleNextMonth} className="nav-button">
            <span className="custom-arrow right-arrow">›</span>
          </button>
          <span className="month-year">{getMonthYearString()}</span>

          <button onClick={handleTodayClick} className="today-button">
            Today
          </button>

          {/* Dropdown for switching athletes */}
          <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleDropdownToggle}>
              <img src={UserProfile} alt="Current Athlete" className="dropdown-athlete-pic" />
              {/* Display selected athlete's name or the first athlete */}
              <span className="dropdown-athlete-name">
                {selectedAthlete ? selectedAthlete.name : (athletes.length > 0 ? athletes[0].name : "No Athlete")}
              </span>
              <img src={DownArrow} alt="Down Arrow" className="dropdown-arrow" />
            </div>

            {dropdownOpen && (
              <ul className="dropdown-list">
                {athletes.map((athlete) => (
                  <li key={athlete.id} className="dropdown-item" onClick={() => handleAthleteSelect(athlete)}>
                    <img src={UserProfile} alt={athlete.name} className="dropdown-item-pic" />
                    <span className="dropdown-item-name">{athlete.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="calendar-weekdays">
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
        </div>

        <div className="calendar-grid">
          {calendarDays}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
