import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import { fetchAthleteDetails, fetchAthletePerformance } from '../../api/api'; // Updated API call
import PerformanceOverview from '../../components/analytics/PerformanceOverview';
import './AnalyticsPage.css';

const AnalyticsDashboard = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { athleteId } = useParams(); // Get athleteId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const athleteData = await fetchAthleteDetails();
        setAthletes(athleteData);

        // Automatically set the selected athlete based on URL param
        if (athleteId) {
          const foundAthlete = athleteData.find((athlete) => athlete.athlete_id === parseInt(athleteId));
          if (foundAthlete) setSelectedAthlete(foundAthlete);
        }
      } catch (error) {
        console.error('Error fetching athletes:', error);
      }
    };

    loadAthletes();
  }, [athleteId]); // Re-run when athleteId changes

  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete);
    navigate(`/analytics/${athlete.athlete_id}`); // Navigate to the athlete's analytics page
  };

  // Filter athletes based on search query
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="analytics-dashboard-page">
      <SideBar />
      <NavBar />

      <div className="dashboard-container">
        {/* Athlete List */}
        <div className="athlete-list">
          <input
            type="text"
            placeholder="Search athlete"
            className="search-athlete"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="athlete-list-items">
            {filteredAthletes.map(athlete => (
              <div
                key={athlete.id}
                className={`athlete-item ${selectedAthlete && selectedAthlete.athlete_id === athlete.athlete_id ? 'active' : ''}`}
                onClick={() => handleAthleteSelect(athlete)}
              >
                {athlete.name}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {selectedAthlete ? (
            <div>
              <h2>{selectedAthlete.name}'s Performance Overview</h2>
              {/* Placeholder for performance and exercise insights */}
              <PerformanceOverview athleteId={athleteId} />
            </div>
          ) : (
            <h2>Select an Athlete to View Analytics</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
