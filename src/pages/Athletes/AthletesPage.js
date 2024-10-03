import React, { useState, useEffect } from 'react';
import { fetchAthleteDetails } from '../../api/api';
import AthleteCard from '../../components/athletes/AthleteCard';
import AthleteForm from '../../components/athletes/AthleteForm';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import SearchBox from '../../components/common/SearchBox';
import './AthletesPage.css';

/**
 * AthletesPage component - Displays a list of athletes with search and add functionality
 */
const AthletesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  /**
   * Fetch athletes from the API
   */
  const getAthletes = async () => {
    try {
      const data = await fetchAthleteDetails();
      setAthletes(data);
      setFilteredAthletes(data); // Initialize filtered athletes.
    } catch (error) {
      console.error('Failed to fetch athletes:', error);
    }
  };

  // Fetch athletes on component mount
  useEffect(() => {
    getAthletes();
  }, []);

  // Filter athletes based on search query
  useEffect(() => {
    const filtered = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAthletes(filtered);
  }, [searchQuery, athletes]);

  /**
   * Refresh the list of athletes after adding a new athlete
   */
  const refreshAthletes = async () => {
    await getAthletes();
  };

  return (
    <div className="athletes-page">
      <SideBar />
      <NavBar />

      {/* Header with search box and Add Athlete button */}
      <div className="athletes-header">
        <div className="search-box-wrapper">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search athletes by name"
          />
        </div>
        <button className="add-athlete-button" onClick={() => setShowForm(true)}>
          Add Athlete
        </button>
      </div>

      {/* Athlete Form (Visible on Add Athlete button click) */}
      {showForm && (
        <AthleteForm
          onSuccess={() => {
            setShowForm(false);
            refreshAthletes();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Athlete Grid */}
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
