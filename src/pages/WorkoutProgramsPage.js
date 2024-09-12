import React from 'react';
import WorkoutProgramForm from '../components/WorkoutProgramForm';
import { useParams } from 'react-router-dom';

function WorkoutProgramsPage() {
  const { clientId } = useParams();

  return (
    <div>
      <h1>Workout Programs for Client {clientId}</h1>
      <WorkoutProgramForm />
    </div>
  );
}

export default WorkoutProgramsPage;
