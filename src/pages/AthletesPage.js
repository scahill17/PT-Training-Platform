import React, { useState, useEffect } from 'react';
import { fetchAthleteDetails } from '../api/api';
import AthleteCard from '../components/AthletesPage/AthleteCard';
import AthleteForm from '../components/AthletesPage/AthleteForm';
import '../styles/AthletesPage.css'

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  

  useEffect(() => {
    // Fetch the athletes when the component mounts
    const getAthletes = async () => {
      const data = await fetchAthleteDetails();  // Use the API call to fetch athletes
      console.log("data: ", data);
      setAthletes(data);  // Set the athletes from the response
    };    

    getAthletes();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filter athletes based on the search query
    const filtered = athletes.filter((athlete) => 
      athlete.name.toLowerCase().includes(query)
    );
    setFilteredAthletes(filtered);
  };

  const refreshAthletes = async () => {
    const data = await fetchAthleteDetails();
    setAthletes(data);
  };

  return (
    <div className="athletes-page">
      <div className="athletes-header">
        <input
          type="text"
          placeholder="Search athletes by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-athlete-button" onClick={() => setShowForm(true)}>
          Add Athlete
        </button>
      </div>

      {/* Show Add Athlete Form as Modal */}
      {showForm && (
        <AthleteForm
          onSuccess={() => {
            setShowForm(false);
            refreshAthletes();  // Refresh the list of athletes after successful submission
          }}
          onCancel={() => setShowForm(false)}  // Hide the form if cancelled
        />
      )}

      <div className="athletes-grid">
        {(filteredAthletes.length > 0 ? filteredAthletes : athletes)?.map(athlete => (
          <AthleteCard key={athlete.athlete_id} athlete={athlete} />
        ))}
      </div>
    </div>
  );
};

export default Athletes;
