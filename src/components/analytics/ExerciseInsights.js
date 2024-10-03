import React, { useState, useEffect, useCallback } from 'react';
import { fetchExercises, fetchExercisePerformance } from '../../api/api'; 
import './ExerciseInsights.css';

/**
 * Exercise Insights component provides trends and performance details for a specific athlete.
 * @param {number} athleteId - ID of the selected athlete
 */
const ExerciseInsights = ({ athleteId }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * Fetches available exercises and sets the data to state.
   */
  const loadExercises = async () => {
    try {
      const exerciseData = await fetchExercises();
      setExercises(exerciseData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setErrorMessage('Unable to load exercises. Please try again later.');
    }
  };

  /**
   * Fetches performance data for the selected exercise.
   * Wrapped in useCallback to prevent re-creation on every render.
   */
  const loadPerformanceData = useCallback(async () => {
    if (!selectedExercise) return;

    setIsLoading(true);
    setErrorMessage(null); // Clear previous error message

    try {
      const performance = await fetchExercisePerformance(athleteId, selectedExercise);

      if (performance && performance.length > 0) {
        setPerformanceData(performance[0]);
      } else {
        setPerformanceData(null); 
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
      setErrorMessage('Failed to load performance data.');
      setPerformanceData(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedExercise, athleteId]); // Memoize function to prevent re-creation

  // Load exercises on component mount
  useEffect(() => {
    loadExercises();
  }, []);

  // Load performance data when the selected exercise or athlete changes
  useEffect(() => {
    loadPerformanceData(); // Now loadPerformanceData is memoized
  }, [loadPerformanceData]);

  return (
    <div className="exercise-trend-container">
      <h2><strong>Exercise Trend</strong></h2>

      {/* Exercise Selection Dropdown */}
      <select
        className="exercise-dropdown"
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        <option value="">Select an Exercise</option>
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>

      {isLoading && <p>Loading performance data...</p>}

      {/* Show performance data */}
      {performanceData && (
        <div className="performance-data">
          <h2>Exercise Insights</h2>
          <p><strong>Total Sessions:</strong> {performanceData.total_sessions}</p>
          <p><strong>Average Weight Lifted:</strong> {performanceData.average_weight} kg</p>
          <p><strong>Average Reps:</strong> {performanceData.average_reps}</p>
          <p><strong>Personal Best Weight:</strong> {performanceData.personal_best_weight} kg</p>
          <p><strong>Personal Best Reps:</strong> {performanceData.personal_best_reps}</p>
        </div>
      )}

      {/* Show message when no performance data is available */}
      {!isLoading && !performanceData && selectedExercise && (
        <p className="no-data">No performance data available for the selected exercise.</p>
      )}

      {/* Initial state when no exercise is selected */}
      {!selectedExercise && <p>Please select an exercise to view performance data.</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ExerciseInsights;
