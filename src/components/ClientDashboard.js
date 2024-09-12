import React, { useState, useEffect } from 'react';

function ClientDashboard() {
  const [clients, setClients] = useState([]);

  // Placeholder client data for now, this will be replaced by an API call
  useEffect(() => {
    const placeholderClients = [
      { client_id: 1, name: "John Doe", age: 25, goals: "Build Muscle" },
      { client_id: 2, name: "Jane Smith", age: 30, goals: "Lose Weight" },
    ];
    setClients(placeholderClients);
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.client_id}>
              <td>{client.name}</td>
              <td>{client.age}</td>
              <td>{client.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientDashboard;
