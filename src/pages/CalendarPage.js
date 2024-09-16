import React from 'react';
import NavBar from '../Global/NavBar'; // Assuming you have this already
import SideBar from '../Global/SideBar'; // Assuming you have this already
import CalendarComponent from '../components/WorkoutPages/CalendarComponent';
import '../../styles/CalendarPage.css'; // Styling

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <NavBar />
      <SideBar />
      <div className="calendar-container">
        <CalendarComponent />
      </div>
    </div>
  );
};

export default CalendarPage;