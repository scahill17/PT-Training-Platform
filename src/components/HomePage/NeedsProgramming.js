import React from 'react';

const NeedsProgramming = ({ clients }) => {
  return (
    <div className="needs-programming">
      <h2>Needs Programming</h2>
      {clients.length > 0 ? (
        clients.map((client) => (
          <div key={client.id} className="client-needs-programming">
            <p>{client.name}</p>
          </div>
        ))
      ) : (
        <p>All clients are scheduled for the next week</p>
      )}
    </div>
  );
};

export default NeedsProgramming;
