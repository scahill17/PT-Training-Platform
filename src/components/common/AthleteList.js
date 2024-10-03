import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import './AthleteList.css';

/**
 * AthleteList component - Displays a list of athletes with search functionality
 * @param {Array} athletes - Array of athlete objects
 * @param {Object} selectedAthlete - The currently selected athlete
 * @param {Function} setSelectedAthlete - Function to update the selected athlete
 */
const AthleteList = ({ athletes, selectedAthlete, setSelectedAthlete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter athletes based on the search query
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Handle selection of an athlete
   * @param {Object} athlete - The athlete being selected
   */
  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete);
    try {
      navigate(`/analytics/${athlete.athlete_id}`);
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

  return (
    <div className="athlete-list">
      {/* Search box for filtering athletes */}
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search athlete"
      />
      <div className="athlete-list-items">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map(athlete => (
            <div
              key={athlete.id}
              className={`athlete-item-card ${selectedAthlete && selectedAthlete.athlete_id === athlete.athlete_id ? 'active' : ''}`}
              onClick={() => handleAthleteSelect(athlete)}
            >
              {athlete.name}
            </div>
          ))
        ) : (
          <div>No athletes found</div>
        )}
      </div>
    </div>
  );
};

export default AthleteList;