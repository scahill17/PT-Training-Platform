import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import { fetchAthleteDetails } from '../../api/api';
import PerformanceOverview from '../../components/analytics/PerformanceOverview';
import ExerciseInsights from '../../components/analytics/ExerciseInsights';
import AthleteList from '../../components/common/AthleteList'; // Import the new AthleteList component
import './AnalyticsPage.css';

const AnalyticsDashboard = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const { athleteId } = useParams();
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
  }, [athleteId]);

  return (
    <div className="analytics-dashboard-page">
      <SideBar />
      <NavBar />

      <div className="dashboard-container">
        {/* Athlete List */}
        <AthleteList
          athletes={athletes}
          selectedAthlete={selectedAthlete}
          setSelectedAthlete={setSelectedAthlete}
        />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {selectedAthlete ? (
            <>
              <h2>{selectedAthlete.name}'s Analytics</h2>
              <PerformanceOverview athleteId={athleteId} />
              <ExerciseInsights athleteId={athleteId} />
            </>
          ) : (
            <h2>Select an Athlete to View Analytics</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
