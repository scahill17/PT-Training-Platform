import React, { useState, useEffect } from 'react';
import { fetchExercises, fetchExercisePerformance } from '../../api/api'; // API calls for fetching exercises and performance data
import './ExerciseInsights.css';

const ExerciseInsights = ({ athleteId }) => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [performanceData, setPerformanceData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    // Fetch all exercises for the dropdown
    useEffect(() => {
      const loadExercises = async () => {
        try {
          const exerciseData = await fetchExercises();
          setExercises(exerciseData);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      };
  
      loadExercises();
    }, []);
  
    // Fetch performance data when a new exercise is selected
    useEffect(() => {
      const loadPerformanceData = async () => {
        if (!selectedExercise) return; // If no exercise selected, skip the fetch
  
        setIsLoading(true); // Show loading indicator
  
        try {
          const performance = await fetchExercisePerformance(athleteId, selectedExercise);
  
          // Check if data is available
          if (performance && performance.length > 0) {
            setPerformanceData(performance[0]); // Assuming the API returns an array, take the first element
          } else {
            setPerformanceData(null); // No data for the selected exercise
          }
        } catch (error) {
          console.error('Error fetching performance data:', error);
          setPerformanceData(null); // Set no data in case of error
        } finally {
          setIsLoading(false); // Hide loading indicator
        }
      };
  
      loadPerformanceData();
    }, [selectedExercise, athleteId]);
  
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
  
        {/* Show a loading state while data is being fetched */}
        {isLoading && <p>Loading performance data...</p>}
  
        {/* Display performance data */}
        {performanceData && (
          <div className="performance-data">
            <h2>Performance Overview for {performanceData.exercise_name}</h2>
            <p><strong>Total Sessions:</strong> {performanceData.total_sessions}</p>
            <p><strong>Average Weight Lifted:</strong> {performanceData.average_weight} kg</p>
            <p><strong>Average Reps:</strong> {performanceData.average_reps}</p>
            <p><strong>Personal Best Weight:</strong> {performanceData.personal_best_weight} kg</p>
            <p><strong>Personal Best Reps:</strong> {performanceData.personal_best_reps}</p>
          </div>
        )}
  
        {/* Display a message when no performance data is available */}
        {!isLoading && !performanceData && selectedExercise && (
          <p className="no-data">No performance data available for the selected exercise.</p>
        )}
  
        {/* Initial state when no exercise is selected */}
        {!selectedExercise && <p>Please select an exercise to view performance data.</p>}
      </div>
    );
  };
  

export default ExerciseInsights;
