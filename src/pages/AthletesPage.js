// src/pages/AthletesPage.js
import React, { useState, useEffect } from 'react';
import { fetchClients } from '../api/api';
import ClientCard from '../components//AthletesPage/ClientCard';

const AthletesPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      if (data) {
        setClients(data);
      }
    };

    getClients();
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
