// src/pages/AthletesPage.js
import React, { useState, useEffect } from 'react';
import ClientCard from '../components//AthletesPage/ClientCard';

const AthletesPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Simulating client data
    setClients([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        goals: 'Build muscle',
        medicalConditions: 'None'
      },
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        goals: 'Build muscle',
        medicalConditions: 'None'
      },
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        goals: 'Build muscle',
        medicalConditions: 'None'
      },
      // Add more client objects
    ]);
  }, []);

  return (
    <div className="athletes-page">
      <h1>Athletes</h1>
      <div className="client-list">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default AthletesPage;
