import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DownArrow from '../../assets/Down Arrow.png';
import UserProfile from '../../assets/User Profile.png';
import '../../styles/AthletesDropdown.css';

const AthletesDropdown = ({ athletes, selectedAthlete, setSelectedAthlete, dropdownOpen, setDropdownOpen }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleAthleteSelect = (athlete) => {
    setDropdownOpen(false);
    setSelectedAthlete(athlete);
    navigate(`/athlete/${athlete.athlete_id}/calendar`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setDropdownOpen]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={UserProfile} alt="Current Athlete" className="dropdown-athlete-pic" />
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
  );
};

export default AthletesDropdown;