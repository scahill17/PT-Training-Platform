import React, { useState, useEffect } from 'react';
import { fetchAthleteDetails } from '../api/api';
import AthleteCard from '../components/AthletesPage/AthleteCard';
import AthleteForm from '../components/AthletesPage/AthleteForm';
import NavBar from '../components/Global/NavBar';
import SideBar from '../components/Global/SideBar';
import '../styles/AthletesPage.css'

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const getAthletes = async () => {
      const data = await fetchAthleteDetails();  
      console.log("data: ", data);
      setAthletes(data);  
    };

    getAthletes();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
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
        {(filteredAthletes.length > 0 ? filteredAthletes : athletes)?.map(athlete => (
          <AthleteCard key={athlete.athlete_id} athlete={athlete} />
        ))}
      </div>
    </div>
  );
};

export default Athletes;