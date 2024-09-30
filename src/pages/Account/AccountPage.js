import React, { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import './AccountPage.css';
import { fetchAthleteDetails, deleteAthlete, fetchExercises, deleteExercise } from '../../api/api';

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('details');
  const [athletes, setAthletes] = useState([]);
  const [exercises, setExercises] = useState([]); // State for exercises
  const userData = {
    name: 'John Coach',
    email: 'john.coach@example.com',
  };

  useEffect(() => {
    const loadAthletes = async () => {
      const data = await fetchAthleteDetails();
      setAthletes(data);
    };
    loadAthletes();
  }, []);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises();
      setExercises(data);
    };
    loadExercises();
  }, []);

  const handleTabSwitch = (tab) => setSelectedTab(tab);

  const handleDeleteAthlete = async (athleteId) => {
    await deleteAthlete(athleteId);
    setAthletes(athletes.filter((athlete) => athlete.athlete_id !== athleteId));
  };

  const handleDeleteExercise = async (exerciseId) => {
    await deleteExercise(exerciseId);
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  return (
    <div className="account-page">
      <SideBar />
      <NavBar />
      <div className="account-content">
        <div className="account-tabs">
          <ul>
            <li className={selectedTab === 'details' ? 'active' : ''} onClick={() => handleTabSwitch('details')}>
              My Details
            </li>
            <li className={selectedTab === 'manage' ? 'active' : ''} onClick={() => handleTabSwitch('manage')}>
              Manage Athletes
            </li>
            <li className={selectedTab === 'exercises' ? 'active' : ''} onClick={() => handleTabSwitch('exercises')}>
              Manage Exercises
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {selectedTab === 'details' && (
            <form className="details-form">
              <h3>Personal Information</h3>
              <div className="form-section">
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={userData.name} readOnly />
                </div>
                <div className="input-group">
                  <label htmlFor="email">E-mail Address</label>
                  <input type="email" id="email" name="email" value={userData.email} readOnly />
                </div>
              </div>
            </form>
          )}

          {selectedTab === 'manage' && (
            <div className="manage-athletes">
              <h3>Manage Athletes</h3>
              <ul className="athlete-list">
                {athletes.length > 0 ? (
                  athletes.map((athlete) => (
                    <li key={athlete.athlete_id} className="athlete-item">
                      <div>
                        <strong>{athlete.name}</strong> - {athlete.email}
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteAthlete(athlete.athlete_id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No athletes available.</p>
                )}
              </ul>
            </div>
          )}

          {selectedTab === 'exercises' && (
            <div className="manage-athletes"> {/* Reused manage-athletes class */}
              <h3>Manage Exercises</h3>
              <ul className="athlete-list"> {/* Reused athlete-list class */}
                {exercises.length > 0 ? (
                  exercises.map((exercise) => (
                    <li key={exercise.id} className="athlete-item"> {/* Reused athlete-item class */}
                      <div>
                        <strong>{exercise.name}</strong>
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteExercise(exercise.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No exercises available.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
