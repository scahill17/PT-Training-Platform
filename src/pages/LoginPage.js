// src/pages/LoginPage.js
import React, { useState } from 'react';
import '../styles/LoginPage.css'; // Add your styles later

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
