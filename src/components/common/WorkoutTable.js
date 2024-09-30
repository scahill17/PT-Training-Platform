import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './WorkoutTable.css';

const WorkoutTable = ({ exercise, index, setExercises, exercises }) => {
  const handleTableChange = (setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field][setIndex] = value;
    setExercises(updatedExercises);
  };

  const handleAddSetRow = () => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets += 1;
    updatedExercises[index].reps.push('');
    updatedExercises[index].weight.push('');
    setExercises(updatedExercises);
  };

  const handleRemoveSetRow = () => {
    const updatedExercises = [...exercises];
    if (updatedExercises[index].sets > 1) {
      updatedExercises[index].sets -= 1;
      updatedExercises[index].reps.pop();
      updatedExercises[index].weight.pop();
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
