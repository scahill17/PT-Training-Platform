import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

/**
 * ErrorPage component - Displays a 404 error message when the user navigates to an invalid route
 */
const ErrorPage = () => {
  const navigate = useNavigate();

  /**
   * Handle navigation to the home page when the "Go Home" button is clicked
   */
  const handleGoHome = () => {
    navigate('/home'); // Redirect to home page
  };

  return (
    <div className="error-page">
      <h1 className="error-title">404</h1>
      <p className="error-message">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <button className="go-home-button" onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
