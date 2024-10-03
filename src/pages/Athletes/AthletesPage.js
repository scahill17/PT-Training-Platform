import React, { useState, useEffect } from 'react';
import { fetchAthleteDetails } from '../../api/api';
import AthleteCard from '../../components/athletes/AthleteCard';
import AthleteForm from '../../components/athletes/AthleteForm';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import './AthletesPage.css';

const AthletesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Custom hook to fetch athletes and manage data.
  const getAthletes = async () => {
    try {
      const data = await fetchAthleteDetails();
      setAthletes(data);
      setFilteredAthletes(data); // Initialize filtered athletes.
    } catch (error) {
      console.error('Failed to fetch athletes:', error);
    }
  };

  useEffect(() => {
    getAthletes();
  }, []);

  // Search athletes by name
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(query)
    );
    setFilteredAthletes(filtered);
  };

  // Refresh athlete list after adding a new athlete.
  const refreshAthletes = async () => {
    await getAthletes();
  };

  return (
    <div className="athletes-page">
      <SideBar />
      <NavBar />
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

      {showForm && (
        <AthleteForm
          onSuccess={() => {
            setShowForm(false);
            refreshAthletes();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="athletes-grid">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete) => (
            <AthleteCard key={athlete.athlete_id} athlete={athlete} />
          ))
        ) : (
          <p className="no-athletes-message">No athletes found.</p>
        )}
      </div>
    </div>
  );
};

export default AthletesPage;
