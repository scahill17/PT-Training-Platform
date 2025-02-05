import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import WorkoutTable from '../../components/common/WorkoutTable';
import { FaSave, FaTrash, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import './ViewWorkoutPage.css';
import { fetchWorkoutSessionDetails, deleteWorkoutSession, saveWorkoutSession, fetchExercises, addNewExercise } from '../../api/api';

/**
 * ViewWorkoutPage component - Displays a workout session for a specific date and athlete.
 * Allows viewing, editing, adding exercises, and saving the session.
 */
const ViewWorkoutPage = () => {
  const { athleteID, day, month, year } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [newExerciseIndexes, setNewExerciseIndexes] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch workout session details and exercise options on mount
  useEffect(() => {
    const loadWorkoutSession = async () => {
      try {
        const sessionDetails = await fetchWorkoutSessionDetails(athleteID, `${year}-${month}-${day}`);
        if (sessionDetails) {
          setExercises(sessionDetails.exercises || []);
        }

        const fetchedExercises = await fetchExercises();
        const exerciseNames = fetchedExercises.map(exercise => exercise.name);
        setExerciseOptions(exerciseNames);
      } catch (error) {
        console.error('Error fetching workout session or exercises:', error);
      }
    };

    loadWorkoutSession();
  }, [athleteID, day, month, year]);

  // Navigate back to the athlete's calendar
  const handleBackClick = () => {
    navigate(`/athlete/${athleteID}/calendar`);
  };

  // Save the updated workout session
  const handleSaveWorkout = async () => {
    try {
      await deleteWorkoutSession(athleteID, `${year}-${month}-${day}`); // Delete the existing session

      const newSessionData = {
        athlete_id: athleteID,
        date: `${year}-${month}-${day}`,
        exercises,
      };

      await saveWorkoutSession(newSessionData); // Save the new session
      alert('Workout session updated successfully!');
      navigate(`/athlete/${athleteID}/calendar`);
    } catch (error) {
      console.error('Error saving workout session:', error);
    }
  };

  // Add a new exercise to the session
  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, instructions: '', reps: ['', '', ''], weight: ['', '', ''] }]);
  };

  // Delete an exercise from the session
  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  // Handle changes to the selected exercise
  const handleExerciseChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = value;
    setExercises(updatedExercises);

    if (value === 'New Exercise') {
      setNewExerciseIndexes([...newExerciseIndexes, index]);
    } else {
      setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
    }
  };

  // Confirm and add a new exercise to the list
  const handleAddNewExerciseConfirm = async (index) => {
    if (newExerciseName.trim()) {
      try {
        await addNewExercise(newExerciseName); // Add new exercise to the database
        setExerciseOptions([...exerciseOptions, newExerciseName]); // Update dropdown options
        handleExerciseChange(index, newExerciseName); // Select the new exercise
        setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
        setNewExerciseName(''); // Clear input
      } catch (error) {
        console.error('Error adding new exercise:', error);
      }
    }
  };

  // Cancel adding a new exercise
  const handleCancelNewExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = '';
    setExercises(updatedExercises);
    setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
    setNewExerciseName('');
  };

  return (
    <div className="view-workout-page">
      <SideBar />
      <NavBar />

      <div className="form-container">
        <div className="back-to-calendar" onClick={handleBackClick}>
          <IoIosArrowBack className="back-arrow" />
          Back to Calendar
        </div>

        <div className="date-row">
          <span className="date-display">{`${day}/${month}/${year}`}</span>
          <div className="icon-buttons">
            <FaSave className="icon save-icon" onClick={handleSaveWorkout} />
            <FaTrash className="icon delete-icon" onClick={() => setShowModal(true)} />
          </div>
        </div>

        {exercises.length === 0 ? (
          <p>No exercises found for this session.</p>
        ) : (
          exercises.map((exercise, index) => (
            <div key={index} className="exercise-block">
              <div className="exercise-row">
                <div className="left-column">
                  <div className="exercise-section">
                    {newExerciseIndexes.includes(index) ? (
                      <div className="new-exercise-input-container">
                        <input
                          type="text"
                          placeholder="Enter new exercise"
                          value={newExerciseName}
                          onChange={(e) => setNewExerciseName(e.target.value)}
                          className="new-exercise-input"
                        />
                        <FaCheck className="new-exercise-tick" onClick={() => handleAddNewExerciseConfirm(index)} />
                        <FaTimes className="new-exercise-cross" onClick={() => handleCancelNewExercise(index)} />
                      </div>
                    ) : (
                      <select
                        className="exercise-select"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, e.target.value)}
                      >
                        <option value="">Select Exercise</option>
                        {exerciseOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                        <option value="New Exercise" style={{ fontWeight: 'bold' }}>
                          New Exercise
                        </option>
                      </select>
                    )}
                  </div>

                  <div className="exercise-instructions-section">
                    <textarea
                      className="exercise-instructions"
                      placeholder="Exercise Instructions"
                      value={exercise.instructions || ''}
                      onChange={(e) => {
                        const updatedExercises = [...exercises];
                        updatedExercises[index].instructions = e.target.value;
                        setExercises(updatedExercises);
                      }}
                    />
                  </div>
                </div>

                <div className="right-column">
                  <WorkoutTable
                    exercise={exercise}
                    index={index}
                    setExercises={setExercises}
                    exercises={exercises}
                  />
                </div>
              </div>

              <div className="delete-exercise-button">
                <button onClick={() => handleDeleteExercise(index)} className="delete-exercise-btn">
                  Delete Exercise
                </button>
              </div>
            </div>
          ))
        )}

        <button className="add-exercise-button" onClick={handleAddExercise}>
          <FaPlus /> Add Exercise
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay-discard">
          <div className="modal-content">
            <p>Are you sure you want to discard changes to this workout session?</p>
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={handleBackClick}>
                Yes
              </button>
              <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWorkoutPage;