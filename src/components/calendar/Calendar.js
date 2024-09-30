import React from 'react';
import { getDaysInMonth } from '../../utils/dateUtils';
import './Calendar.css';

const Calendar = ({ date, hoveredDay, setHoveredDay, handleEditSessionClick, handleViewSessionClick, workoutSessions }) => {
  const daysInCurrentMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const daysInPrevMonth = getDaysInMonth(prevMonth);

  const calendarDays = [];

  // Function to check if a workout session exists on a particular day
  const hasWorkoutSession = (day) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return workoutSessions.some(session => session.date === formattedDate);
  };

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(
      <div key={`prev-${i}`} className="calendar-day trailing">
        {daysInPrevMonth - i}
      </div>
    );
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const hasSession = hasWorkoutSession(day);
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`calendar-day ${hoveredDay === day ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredDay(day)}
        onMouseLeave={() => setHoveredDay(null)}
      >
        <div className="date-dot-container">
          <div className="date-number">
            {day === 1 ? `${date.toLocaleString('default', { month: 'long' })} ${day}` : day}
          </div>
          {hasSession && <div className="workout-dot"></div>} {/* Dot to the right of the date */}
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
  }

  const totalCells = firstDayOfMonth + daysInCurrentMonth;
  const remainingDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(
      <div key={`next-${i}`} className="calendar-day trailing">
        {i}
      </div>
    );
  }

  return (
    <div className="calendar-grid">
      {calendarDays}
    </div>
  );
};

export default Calendar;
