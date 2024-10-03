import React from 'react';
import { getDaysInMonth } from '../common/dateUtils';
import './Calendar.css';

/**
 * Calendar component - Renders a calendar for the specified date
 * @param {Object} date - The current date object
 * @param {Number} hoveredDay - Day that is currently hovered
 * @param {Function} setHoveredDay - Function to update the hovered day
 * @param {Function} handleEditSessionClick - Callback to handle creating a new session
 * @param {Function} handleViewSessionClick - Callback to handle viewing an existing session
 * @param {Array} workoutSessions - Array of workout session objects
 */
const Calendar = ({ date, hoveredDay, setHoveredDay, handleEditSessionClick, handleViewSessionClick, workoutSessions }) => {
  const daysInCurrentMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const daysInPrevMonth = getDaysInMonth(prevMonth);

  const calendarDays = [];

  // Helper function to check if a workout session exists on a particular day
  const hasWorkoutSession = (day) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return workoutSessions.some(session => session.date === formattedDate);
  };

  // Function to render days from the previous month
  const renderPrevMonthDays = () => {
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push(
        <div key={`prev-${i}`} className="calendar-day trailing">
          {daysInPrevMonth - i}
        </div>
      );
    }
  };

  // Function to render days of the current month
  const renderCurrentMonthDays = () => {
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const hasSession = hasWorkoutSession(day);
      calendarDays.push(
        <CalendarDay
          key={`day-${day}`}
          day={day}
          hoveredDay={hoveredDay}
          setHoveredDay={setHoveredDay}
          hasSession={hasSession}
          handleEditSessionClick={handleEditSessionClick}
          handleViewSessionClick={handleViewSessionClick}
          date={date}
        />
      );
    }
  };

  // Function to render trailing days from the next month
  const renderNextMonthDays = () => {
    const totalCells = firstDayOfMonth + daysInCurrentMonth;
    const remainingDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="calendar-day trailing">
          {i}
        </div>
      );
    }
  };

  renderPrevMonthDays();
  renderCurrentMonthDays();
  renderNextMonthDays();

  return <div className="calendar-grid">{calendarDays}</div>;
};

/**
 * CalendarDay component - Renders a single calendar day with optional workout session
 * @param {Object} props - The day, hover, session, and click handling props
 */
const CalendarDay = ({ day, hoveredDay, setHoveredDay, hasSession, handleEditSessionClick, handleViewSessionClick, date }) => (
  <div
    className={`calendar-day ${hoveredDay === day ? 'hovered' : ''}`}
    onMouseEnter={() => setHoveredDay(day)}
    onMouseLeave={() => setHoveredDay(null)}
  >
    <div className="date-dot-container">
      <div className="date-number">
        {day === 1 ? `${date.toLocaleString('default', { month: 'long' })} ${day}` : day}
      </div>
      {hasSession && <div className="workout-dot"></div>}
    </div>
    {hoveredDay === day && (
      <button
        className="session-button"
        onClick={() => hasSession ? handleViewSessionClick(day) : handleEditSessionClick(day)}
      >
        {hasSession ? 'View Session' : 'Create Session'}
      </button>
    )}
  </div>
);

export default Calendar;
