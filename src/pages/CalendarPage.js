import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAthleteDetails } from '../api/api'; 
import Calendar from '../components/CalendarPage/Calendar';
import AthletesDropdown from '../components/Global/AthletesDropdown';
import NavBar from '../components/Global/NavBar';
import SideBar from '../components/Global/SideBar';
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

      const athlete = athleteData.find(a => a.athlete_id === parseInt(athleteId));
      console.log(athlete);
      if (athlete) {
        setSelectedAthlete(athlete);
      } else {
        setSelectedAthlete(athleteData[0]); 
      }
    };

    loadAthletes();
  }, [athleteId]);


  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handleTodayClick = () => setDate(new Date());

  const handleEditSessionClick = (day) => {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); 
    const formattedDay = String(day).padStart(2, '0'); 
    const year = date.getFullYear(); 

    navigate(`/athlete/${athleteId}/calendar/${formattedDay}/${formattedMonth}/${year}`);
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
        />
      </div>
    </div>
  );
};

export default CalendarPage;