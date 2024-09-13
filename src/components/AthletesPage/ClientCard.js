import React from 'react';

const ClientCard = ({ client }) => {
  return (
    <div className="client-card">
      <img src="/default-profile.png" alt="Profile" className="profile-img" />
      <h3>{client.name}</h3>
      <p>Age: {client.age}</p>
      <p>Goals: {client.fitness_goals}</p>
      <p>Medical Conditions: {client.medical_conditions}</p>
    </div>
  );
};

export default ClientCard;
