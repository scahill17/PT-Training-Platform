import React, { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import './AccountPage.css';
import { fetchAthleteDetails, deleteAthlete, fetchExercises, deleteExercise } from '../../api/api';

/**
 * AccountPage component - Displays the account management page for users to view details, manage athletes, and manage exercises
 */
const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('details');
  const [athletes, setAthletes] = useState([]);
  const [exercises, setExercises] = useState([]); // State for exercises

  const userData = {
    name: 'Anthony Longhurst',
    email: 'anthony.longhurst@example.com',
  };

  // Load athlete details when component mounts
  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const data = await fetchAthleteDetails();
        setAthletes(data);
      } catch (error) {
        console.error('Failed to load athletes', error);
      }
    };
    loadAthletes();
  }, []);

  // Load exercises when component mounts
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises();
        setExercises(data);
      } catch (error) {
        console.error('Failed to load exercises', error);
      }
    };
    loadExercises();
  }, []);

  // Handle tab switching for different sections
  const handleTabSwitch = (tab) => setSelectedTab(tab);

  // Handle deleting an athlete
  const handleDeleteAthlete = async (athleteId) => {
    try {
      await deleteAthlete(athleteId);
      setAthletes(athletes.filter((athlete) => athlete.athlete_id !== athleteId));
    } catch (error) {
      console.error('Failed to delete athlete', error);
    }
  };

  // Handle deleting an exercise
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
    } catch (error) {
      console.error('Failed to delete exercise', error);
    }
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
          {/* Tab content for personal details */}
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

          {/* Tab content for managing athletes */}
          {selectedTab === 'manage' && (
            <div className="manage-athletes-accounts">
              <h3>Manage Athletes</h3>
              <ul className="manage-athlete-list">
                {athletes.length > 0 ? (
                  athletes.map((athlete) => (
                    <li key={athlete.athlete_id} className="manage-athlete-item">
                      <div>
                        <strong>{athlete.name}</strong> - {athlete.email}
                      </div>
                      <button className="delete-btn" onClick={() => handleDeleteAthlete(athlete.athlete_id)}>
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

          {/* Tab content for managing exercises */}
          {selectedTab === 'exercises' && (
            <div className="manage-athletes-accounts"> {/* Reused manage-athletes class */}
              <h3>Manage Exercises</h3>
              <ul className="manage-athlete-list"> {/* Reused athlete-list class */}
                {exercises.length > 0 ? (
                  exercises.map((exercise) => (
                    <li key={exercise.id} className="manage-athlete-item"> {/* Reused athlete-item class */}
                      <div>
                        <strong>{exercise.name}</strong>
                      </div>
                      <button className="delete-btn" onClick={() => handleDeleteExercise(exercise.id)}>
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
