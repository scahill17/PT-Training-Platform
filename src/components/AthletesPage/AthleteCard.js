import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../assets/User Profile.png';
import CalendarIcon from '../../assets/Calendar.png';
import AnalyticsIcon from '../../assets/Analytics Icon.png';
import ChatIcon from '../../assets/Chat Icon.png';
import '../../styles/AthleteCard.css';

const AthleteCard = ({ athlete }) => {
  const navigate = useNavigate();

  return (
    <div className="athlete-card">
      <div className="athlete-card-header">
        <img src={UserProfile} alt="Profile" className="profile-pic" />
        <div className="athlete-name">{athlete.name}</div>
      </div>
      <div className="athlete-info">
        <span className="label">Email: </span>
        <span className="value">{athlete.email}</span>
      </div>
      <div className="athlete-info">
        <span className="label">Age: </span>
        <span className="value">{athlete.age}</span>
      </div>
      <div className="athlete-info">
        <span className="label">Goals: </span>
        <span className="value">{athlete.fitness_goals}</span>
      </div>
      <div className="athlete-info">
        <span className="label">Medical Conditions: </span>
        <span className="value">{athlete.medical_conditions}</span>
      </div>
      <div className="athlete-card-actions">
        <img
          src={CalendarIcon}
          alt="Calendar"
          className="action-icon"
          onClick={() => navigate(`/athlete/${athlete.athlete_id}/calendar`)}
        />
        <img
          src={AnalyticsIcon}
          alt="Analytics"
          className="action-icon"
          onClick={() => navigate(`/athlete/${athlete.athlete_id}/analytics`)}
        />
        <img
          src={ChatIcon}
          alt="Chat"
          className="action-icon"
          onClick={() => navigate(`/athlete/${athlete.athlete_id}/chat`)}
        />
      </div>
    </div>
  );
};

export default AthleteCard;
