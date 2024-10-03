import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox'; // Import the new SearchBox component
import './AthleteList.css';

const AthleteList = ({ athletes, selectedAthlete, setSelectedAthlete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter athletes based on search query
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete);
    navigate(`/analytics/${athlete.athlete_id}`);
  };

  return (
    <div className="athlete-list">
      {/* Use the SearchBox component */}
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search athlete"
      />
      <div className="athlete-list-items">
        {filteredAthletes.map(athlete => (
          <div
            key={athlete.id}
            className={`athlete-item-card ${selectedAthlete && selectedAthlete.athlete_id === athlete.athlete_id ? 'active' : ''}`}
            onClick={() => handleAthleteSelect(athlete)}
          >
            {athlete.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthleteList;
