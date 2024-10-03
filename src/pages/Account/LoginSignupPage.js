import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css';

/**
 * LoginSignupPage component - Displays a form for either logging in or signing up based on user interaction
 */
const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms
  const navigate = useNavigate();

  /**
   * Toggles between login and signup forms
   */
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  /**
   * Handles form submission and redirects to the home page
   * @param {Object} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="login-signup-page">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Only show name input for signup */}
          {!isLogin && (
            <div className="input-container">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>
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
