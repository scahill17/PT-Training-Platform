import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignupPage.css';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login and signup
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-signup-page">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-container">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
            </>
          )}
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="toggle-section">
          {isLogin ? (
            <>
              <p>Don’t have an account?</p>
              <button onClick={handleToggle} className="toggle-btn">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button onClick={handleToggle} className="toggle-btn">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
