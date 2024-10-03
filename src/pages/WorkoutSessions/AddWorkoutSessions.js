import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import WorkoutTable from '../../components/common/WorkoutTable';
import { FaSave, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import './AddWorkoutSessions.css';
import { fetchExercises, addNewExercise, saveWorkoutSession } from '../../api/api';

/**
 * AddWorkoutSessions component - Displays a form for adding and editing workout sessions
 * Allows adding new exercises, editing sets, reps, and weights, and saving the workout session
 */
const AddWorkoutSessions = () => {
  const { athleteID, day, month, year } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExerciseIndexes, setNewExerciseIndexes] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');

  // Fetch exercises from the database on component mount
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const fetchedExercises = await fetchExercises();
        const exerciseNames = fetchedExercises.map(exercise => exercise.name);
        setExerciseOptions([...exerciseNames]);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    loadExercises();
  }, []);

  // Navigate back to the athlete's calendar
  const handleBackClick = () => {
    navigate(`/athlete/${athleteID}/calendar`);
  };

  // Add a new exercise block to the session
  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, instructions: '', reps: ['', '', ''], weight: ['', '', ''] }]);
  };

  // Update the selected exercise or add a new one
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

  // Update the exercise instructions
  const handleInstructionsChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].instructions = value;
    setExercises(updatedExercises);
  };

  // Confirm adding a new exercise and update the dropdown list
  const handleAddNewExerciseConfirm = async (index) => {
    if (newExerciseName.trim()) {
      try {
        await addNewExercise(newExerciseName); // Add to the database
        setExerciseOptions([...exerciseOptions, newExerciseName]); // Update dropdown
        handleExerciseChange(index, newExerciseName); // Set the new exercise
        setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
        setNewExerciseName(''); // Clear the input
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

  // Open the discard confirmation modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Confirm discarding the workout session
  const confirmDiscard = () => {
    setShowModal(false);
    handleBackClick();
  };

  // Remove an exercise from the session
  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  // Save the workout session
  const handleSaveWorkout = async () => {
    try {
      const workoutSessionData = {
        athlete_id: athleteID,
        date: `${year}-${month}-${day}`,
        exercises: exercises.map((exercise) => ({
          name: exercise.name,
          instructions: exercise.instructions,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
        })),
      };

      await saveWorkoutSession(workoutSessionData);
      alert('Workout session saved successfully!');
      navigate(`/athlete/${athleteID}/calendar`);
    } catch (error) {
      console.error('Error saving workout session:', error);
    }
  };

  return (
    <div className="add-workout-page">
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
            <FaTrash className="icon delete-icon" onClick={openModal} />
          </div>
        </div>

        {exercises.length === 0 && (
          <button className="add-exercise-button" onClick={handleAddExercise}>
            Add Exercise
          </button>
        )}

        {exercises.map((exercise, index) => (
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
                    value={exercise.instructions}
                    onChange={(e) => handleInstructionsChange(index, e.target.value)}
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
        ))}

        {exercises.length > 0 && (
          <button className="add-exercise-button" onClick={handleAddExercise}>
            Add Exercise
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay-delete">
          <div className="modal-content">
            <p>Are you sure you want to discard this workout session?</p>
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={confirmDiscard}>
                Yes
              </button>
              <button className="modal-cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWorkoutSessions;
