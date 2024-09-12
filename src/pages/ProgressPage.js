import React from 'react';
import ProgressChart from '../components/ProgressChart';
import { useParams } from 'react-router-dom';

function ProgressPage() {
  const { clientId } = useParams();

  return (
    <div>
      <h1>Progress for Client {clientId}</h1>
      <ProgressChart />
    </div>
  );
}

export default ProgressPage;
