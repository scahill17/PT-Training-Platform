import React from 'react';
import { getDaysInMonth } from '../../utils/dateUtils';
import '../../styles/Calendar.css';

const Calendar = ({ date, hoveredDay, setHoveredDay, handleEditSessionClick }) => {
  const daysInCurrentMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const daysInPrevMonth = getDaysInMonth(prevMonth);
  
  const calendarDays = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(
      <div key={`prev-${i}`} className="calendar-day trailing">
        {daysInPrevMonth - i}
      </div>
    );
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`calendar-day ${hoveredDay === day ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredDay(day)}
        onMouseLeave={() => setHoveredDay(null)}
      >
        <div className="date-number">{day === 1 ? `${date.toLocaleString('default', { month: 'long' })} ${day}` : day}</div>
        {hoveredDay === day && (
          <button className="edit-session-button" onClick={() => handleEditSessionClick(day)}>
            Edit Session
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