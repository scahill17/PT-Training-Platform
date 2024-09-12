import React, { useEffect, useState } from 'react';
import ClientCard from './ClientCard.js';
import { fetchClients } from '../../api/clients.js';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      setClients(data);
    };
    getClients();
  }, []);

  return (
    <div className="client-list">
      {clients.length > 0 ? (
        clients.map((client) => <ClientCard key={client.id} client={client} />)
      ) : (
        <p>No clients available</p>
      )}
    </div>
  );
};

export default ClientList;
