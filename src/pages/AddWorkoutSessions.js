import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Global/NavBar';
import SideBar from '../components/Global/SideBar';
import { FaSave, FaTrash } from 'react-icons/fa'; // Save and Delete Icons
import { IoIosArrowBack } from 'react-icons/io'; // Import arrow icon
import '../styles/AddWorkoutSessions.css';

const AddWorkoutSessions = () => {
  const { athleteID, day, month, year } = useParams(); // Extract date and athleteID from the URL
  const navigate = useNavigate(); // For navigating back to the calendar

  const handleBackClick = () => {
    // Navigate back to the athlete's calendar
    navigate(`/athlete/${athleteID}/calendar`);
  };

  return (
    <div className="add-workout-page">
      <SideBar />
      <NavBar />

      <div className="form-container">
        {/* Back to Calendar */}
        <div className="back-to-calendar" onClick={handleBackClick}>
          <IoIosArrowBack className="back-arrow" /> {/* Styled arrowhead */}
          Back to Calendar
        </div>

        {/* Date Row with Save and Delete Icons */}
        <div className="date-row">
          <span className="date-display">{`${day}/${month}/${year}`}</span>
          <div className="icon-buttons">
            <FaSave className="icon save-icon" /> {/* Placeholder for save action */}
            <FaTrash className="icon delete-icon" /> {/* Placeholder for delete action */}
          </div>
        </div>

        {/* Generate Workout Button */}
        <button className="generate-workout-button">
          Generate Workout
        </button>
      </div>
    </div>
  );
};

export default AddWorkoutSessions;
