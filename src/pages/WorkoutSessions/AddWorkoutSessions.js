import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';
import WorkoutTable from '../../components/common/WorkoutTable';
import { FaSave, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import './AddWorkoutSessions.css';
import { fetchExercises, addNewExercise, saveWorkoutSession } from '../../api/api'; // Import the saveWorkoutSession API

const AddWorkoutSessions = () => {
  const { athleteID, day, month, year } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExerciseIndexes, setNewExerciseIndexes] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');

  // Fetch exercises from the database on mount
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const fetchedExercises = await fetchExercises();
        const exerciseNames = fetchedExercises.map(exercise => exercise.name);
        setExerciseOptions([...exerciseNames]);  // Exclude 'New Exercise' initially
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    loadExercises();
  }, []);

  const handleBackClick = () => {
    navigate(`/athlete/${athleteID}/calendar`);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, instructions: '', reps: ['', '', ''], weight: ['', '', ''] }]);
  };

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

  // Handles text input for exercise instructions
  const handleInstructionsChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].instructions = value;
    setExercises(updatedExercises);
  };

  // Handles adding new exercise to both the dropdown and database
  const handleAddNewExerciseConfirm = async (index) => {
    if (newExerciseName.trim()) {
      try {
        await addNewExercise(newExerciseName); // Call to add exercise to DB
        setExerciseOptions([...exerciseOptions, newExerciseName]); // Add new exercise before "New Exercise"
        handleExerciseChange(index, newExerciseName); // Update selected exercise
        setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index)); // Remove from new exercise list
        setNewExerciseName(''); // Clear input field
      } catch (error) {
        console.error('Error adding new exercise:', error);
      }
    }
  };

  const handleCancelNewExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = '';
    setExercises(updatedExercises);
    setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
    setNewExerciseName('');
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const confirmDiscard = () => {
    setShowModal(false);
    handleBackClick();
  };

  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleSaveWorkout = async () => {
    try {
      // Prepare data for the workout session
      const workoutSessionData = {
        athlete_id: athleteID,
        date: `${year}-${month}-${day}`, // Format the date properly
        exercises: exercises.map((exercise) => ({
          name: exercise.name,
          instructions: exercise.instructions,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight
        }))
      };

      console.log("parsed athleteID: ", workoutSessionData.athlete_id);
      console.log("parsed date: ", workoutSessionData.date);
      // Send workout session data to the API to save in the database
      await saveWorkoutSession(workoutSessionData);
      console.log('Workout session saved successfully');
      alert('Workout session updated successfully!');
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
                      {/* Always show "New Exercise" at the bottom and in bold */}
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
