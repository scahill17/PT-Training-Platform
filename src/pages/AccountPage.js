import React, { useState, useEffect } from 'react';
import NavBar from '../components/Global/NavBar';
import SideBar from '../components/Global/SideBar';
import '../styles/AccountPage.css';
import { fetchAthleteDetails, deleteAthlete } from '../api/api';

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('details');
  const [athletes, setAthletes] = useState([]);
  const [userData, setUserData] = useState({
    name: 'John Coach',
    email: 'john.coach@example.com',
  });

  useEffect(() => {
    const loadAthletes = async () => {
      const data = await fetchAthleteDetails();
      setAthletes(data);
    };
    loadAthletes();
  }, []);

  const handleTabSwitch = (tab) => setSelectedTab(tab);

  const handleDeleteAthlete = async (athleteId) => {
    await deleteAthlete(athleteId);
    setAthletes(athletes.filter((athlete) => athlete.athlete_id !== athleteId));
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
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
