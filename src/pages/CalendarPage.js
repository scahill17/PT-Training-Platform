import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAthleteDetails } from '../api/api'; // Fetch athletes from API
import Calendar from '../components/CalendarPage/Calendar';
import AthletesDropdown from '../components/Global/AthletesDropdown';
import '../styles/CalendarPage.css';

const CalendarPage = () => {
  const { athleteId } = useParams();
  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAthletes = async () => {
      const athleteData = await fetchAthleteDetails();
      setAthletes(athleteData);

      // Ensure the correct athlete is selected based on the athleteId from the URL
      const athlete = athleteData.find(a => a.athlete_id === parseInt(athleteId));
      console.log(athlete);
      if (athlete) {
        setSelectedAthlete(athlete);
      } else {
        setSelectedAthlete(athleteData[0]); // Fallback to the first athlete if none match
      }
    };

    loadAthletes();
  }, [athleteId]);


  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handleTodayClick = () => setDate(new Date());

  const handleEditSessionClick = (day) => {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // Format the month as MM
    const formattedDay = String(day).padStart(2, '0'); // Format the day as DD
    const year = date.getFullYear(); // Get the year

    // Navigate to the desired route with day, month, and year
    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}`);
  };

  return (
    <div className="calendar-page">
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
          handleEditSessionClick={handleEditSessionClick} // Update function here
        />
      </div>
    </div>
  );
};

export default CalendarPage;
