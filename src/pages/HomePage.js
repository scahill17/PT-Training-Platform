import React, { useState, useEffect } from 'react';
import WorkoutFeed from '../components/HomePage/WorkoutFeed';
import NeedsProgramming from '../components/HomePage/NeedsProgramming';

const HomePage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Simulating workout and client data
    setWorkouts([
      {
        id: 1,
        clientName: 'John Doe',
        readinessScore: 8,
        duration: 60,
        intensity: 7,
        totalWeight: 300
      },
      // Add more workout objects
    ]);

    setClients([
      { id: 1, name: 'Jane Doe' },
      // Add more clients if necessary
    ]);
  }, []);

  return (
    <div className="home-page">
      <div className="left-column">
        <WorkoutFeed workouts={workouts} />
      </div>
      <div className="right-column">
        <NeedsProgramming clients={clients} />
      </div>
    </div>
  );
};

export default HomePage;