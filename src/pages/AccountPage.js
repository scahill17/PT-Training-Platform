// src/pages/AccountPage.js
import React, { useState } from 'react';
import '../styles/AccountPage.css' // Add your styles later

const AccountPage = () => {
  const [name, setName] = useState('John Coach');
  const [email, setEmail] = useState('john.coach@example.com');

  const handleSave = () => {
    // Add logic to save updated details
    alert('Account details saved!');
  };

  return (
    <div className="account-page">
      <h1>Account Page</h1>
      <div className="account-form">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AccountPage;
