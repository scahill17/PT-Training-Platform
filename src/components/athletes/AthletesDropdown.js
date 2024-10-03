import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DownArrow from '../../assets/Down Arrow.png';
import UserProfile from '../../assets/User Profile.png';
import './AthletesDropdown.css';

/**
 * AthletesDropdown component - Displays a dropdown list of athletes
 * @param {Array} athletes - List of athlete objects
 * @param {Object} selectedAthlete - The currently selected athlete
 * @param {Function} setSelectedAthlete - Function to update the selected athlete
 * @param {Boolean} dropdownOpen - Boolean to toggle dropdown visibility
 * @param {Function} setDropdownOpen - Function to set dropdown open state
 */
const AthletesDropdown = ({ athletes, selectedAthlete, setSelectedAthlete, dropdownOpen, setDropdownOpen }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handles the selection of an athlete and navigation
  const handleAthleteSelect = (athlete) => {
    try {
      setDropdownOpen(false);
      setSelectedAthlete(athlete);
      navigate(`/athlete/${athlete.athlete_id}/calendar`);
    } catch (error) {
      console.error("Error selecting athlete:", error);
      alert("Failed to select athlete. Please try again.");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setDropdownOpen]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <DropdownHeader 
        selectedAthlete={selectedAthlete} 
        setDropdownOpen={setDropdownOpen} 
        dropdownOpen={dropdownOpen} 
      />
      {dropdownOpen && <AthleteList athletes={athletes} onSelect={handleAthleteSelect} />}
    </div>
  );
};

/**
 * DropdownHeader component - Displays the currently selected athlete
 */
const DropdownHeader = ({ selectedAthlete, setDropdownOpen, dropdownOpen }) => (
  <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
    <img src={UserProfile} alt="Current Athlete" className="dropdown-athlete-pic" />
    <span className="dropdown-athlete-name">
      {selectedAthlete ? selectedAthlete.name : "No Athlete Selected"}
    </span>
    <img src={DownArrow} alt="Down Arrow" className="dropdown-arrow" />
  </div>
);

/**
 * AthleteList component - Renders a list of athletes
 */
const AthleteList = ({ athletes, onSelect }) => (
  <ul className="dropdown-list">
    {athletes.length > 0 ? (
      athletes.map((athlete) => (
        <li key={athlete.id} className="dropdown-item" onClick={() => onSelect(athlete)}>
          <img src={UserProfile} alt={athlete.name} className="dropdown-item-pic" />
          <span className="dropdown-item-name">{athlete.name}</span>
        </li>
      ))
    ) : (
      <li className="dropdown-item">No Athletes Available</li>
    )}
  </ul>
);

export default AthletesDropdown;
