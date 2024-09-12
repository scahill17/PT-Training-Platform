import React from 'react';

const ClientCard = ({ client }) => {
  return (
    <div className="client-card">
      <img src="/default-profile.png" alt="Profile" className="profile-img" />
      <h3>{client.name}</h3>
      <p>Email: {client.email}</p>
      <p>Age: {client.age}</p>
      <p>Goals: {client.goals}</p>
      <p>Medical Conditions: {client.medicalConditions}</p>
    </div>
  );
};

export default ClientCard;
