import React, { useState, useEffect } from 'react';

function WorkoutProgramForm() {
  const [program, setProgram] = useState({
    title: '',
    description: '',
    exercises: [],
  });

  const [exerciseLibrary, setExerciseLibrary] = useState([]);

  // Placeholder data for exercises, this will be replaced by an API call
  useEffect(() => {
    const placeholderExercises = [
      { exercise_id: 1, name: "Squats" },
      { exercise_id: 2, name: "Bench Press" },
      { exercise_id: 3, name: "Deadlift" },
    ];
    setExerciseLibrary(placeholderExercises);
  }, []);

  const handleInputChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  const handleExerciseSelect = (e) => {
    const exerciseId = parseInt(e.target.value);
    if (!program.exercises.includes(exerciseId)) {
      setProgram({
        ...program,
        exercises: [...program.exercises, exerciseId],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Program Submitted", program);
    // Here, you'll send the data to your backend
  };

  return (
    <div>
      <h2>Create Workout Program</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={program.title}
            onChange={handleInputChange}
            placeholder="Program Title"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={program.description}
            onChange={handleInputChange}
            placeholder="Program Description"
          ></textarea>
        </div>

        <div>
          <label>Select Exercises:</label>
          <select onChange={handleExerciseSelect}>
            <option value="">Select an Exercise</option>
            {exerciseLibrary.map((exercise) => (
              <option key={exercise.exercise_id} value={exercise.exercise_id}>
                {exercise.name}
              </option>
            ))}
          </select>
          <ul>
            {program.exercises.map((exerciseId) => {
              const exercise = exerciseLibrary.find(e => e.exercise_id === exerciseId);
              return <li key={exerciseId}>{exercise?.name}</li>;
            })}
          </ul>
        </div>

        <button type="submit">Create Program</button>
      </form>
    </div>
  );
}

export default WorkoutProgramForm;
