import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './WorkoutTable.css';

/**
 * WorkoutTable component - Displays a table for an exercise with sets, reps, and weight
 * @param {Object} exercise - The current exercise being edited
 * @param {number} index - The index of the exercise in the exercises array
 * @param {Function} setExercises - Function to update the exercises state
 * @param {Array} exercises - The array of exercises
 */
const WorkoutTable = ({ exercise, index, setExercises, exercises }) => {

  /**
   * Handle change in the reps or weight for a specific set
   * @param {number} setIndex - The index of the set being modified
   * @param {string} field - The field being modified (either 'reps' or 'weight')
   * @param {string} value - The new value for the field
   */
  const handleTableChange = (setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field][setIndex] = value;
    setExercises(updatedExercises);
  };

  /**
   * Add a new set row to the exercise table
   */
  const handleAddSetRow = () => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets += 1;
    updatedExercises[index].reps.push(''); // Add an empty rep input
    updatedExercises[index].weight.push(''); // Add an empty weight input
    setExercises(updatedExercises);
  };

  /**
   * Remove the last set row from the exercise table
   */
  const handleRemoveSetRow = () => {
    const updatedExercises = [...exercises];
    if (updatedExercises[index].sets > 1) {
      updatedExercises[index].sets -= 1;
      updatedExercises[index].reps.pop(); // Remove the last rep input
      updatedExercises[index].weight.pop(); // Remove the last weight input
      setExercises(updatedExercises);
    }
  };

  return (
    <div className="workout-table-container">
      <table className="exercise-table">
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: exercise.sets }).map((_, setIndex) => (
            <tr key={setIndex}>
              <td>{setIndex + 1}</td>
              <td>
                <input
                  type="text"
                  value={exercise.reps[setIndex]}
                  onChange={(e) => handleTableChange(setIndex, 'reps', e.target.value)}
                  className="number-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={exercise.weight[setIndex]}
                  onChange={(e) => handleTableChange(setIndex, 'weight', e.target.value)}
                  className="number-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sets-control">
        <FaMinus className="sets-icon" onClick={handleRemoveSetRow} />
        <span className="sets-label">{`${exercise.sets} Sets`}</span>
        <FaPlus className="sets-icon" onClick={handleAddSetRow} />
      </div>
    </div>
  );
};

export default WorkoutTable;
