const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,  // Assuming JWT_TOKEN is available in the scope
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);  // Stringify the body if it's provided
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    // Log the full response for debugging
    console.log('Full Response:', response);

    if (!response.ok) {
      throw new Error(`Error in ${method} request to ${endpoint}: ${response.statusText}`);
    }

    // Handle empty response bodies to avoid JSON parsing errors
    const responseBody = await response.text();  // Get the raw response text
    if (responseBody) {
      const parsedResponse = JSON.parse(responseBody);  // Parse only if there's content
      console.log('Parsed Response Body:', parsedResponse);  // Log parsed response
      return parsedResponse;
    } else {
      console.log('No Response Body');  // Log in case of no body
      return {};  // Return an empty object if the response body is empty
    }

  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}: `, error);
    throw error;
  }
};

export const fetchAthleteDetails = async () => {
  return apiRequest('athlete_details');
};

export const deleteAthlete = async (athleteId) => {
  try {
    const athleteResponse = await apiRequest(`athletes?id=eq.${athleteId}`, 'GET');
    const userId = athleteResponse[0]?.user_id;

    if (!userId) {
      throw new Error(`No user found for athlete ID ${athleteId}`);
    }

    await apiRequest(`athletes?id=eq.${athleteId}`, 'DELETE');
    console.log(`Athlete with ID ${athleteId} deleted successfully.`);
    await apiRequest(`users?id=eq.${userId}`, 'DELETE');
    console.log(`User with ID ${userId} deleted successfully.`);

  } catch (error) {
    console.error(`Error deleting athlete or user:`, error);
    throw error;
  }
};

export const addAthlete = async (newAthlete) => {
  try {
    await apiRequest('users', 'POST', {
      name: newAthlete.name,
      email: newAthlete.email,
      role: 'client',
    });

    const userFetchResponse = await apiRequest(`users?email=eq.${newAthlete.email}`, 'GET');
    console.log('Fetched user by email: ', userFetchResponse);
    const userId = userFetchResponse[0]?.id;

    if (!userId) {
      throw new Error('User ID could not be retrieved');
    }

    console.log("userID: ", userId);
    console.log("age: ", newAthlete.age);
    console.log("medical: ", newAthlete.medical_conditions);
    console.log("fitness: ", newAthlete.fitness_goals);

    // Add to the athletes table
    const athleteResponse = await apiRequest('athletes', 'POST', {
      user_id: JSON.stringify(userId),
      age: newAthlete.age,
      fitness_goals: newAthlete.fitness_goals,
      medical_conditions: newAthlete.medical_conditions,
    });

    return athleteResponse;

  } catch (error) {
    console.error('Error adding athlete:', error);
    throw error;
  }
};

// Fetch available exercises for the dropdown
export const fetchExercises = async () => {
  return apiRequest('exercises', 'GET');
};

// Add a new exercise to the exercises table
export const addNewExercise = async (exerciseName) => {
  return apiRequest('exercises', 'POST', { name: exerciseName });
};

export const deleteExercise = async (exerciseId) => {
  try {
    await apiRequest(`exercises?id=eq.${exerciseId}`, 'DELETE'); // Delete the exercise by its ID
    console.log(`Exercise with ID ${exerciseId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting exercise:`, error);
    throw error;
  }
};

export const saveWorkoutSession = async (workoutSessionData) => {
  try {
    console.log("128 athleteID: ", workoutSessionData.athlete_id);
    console.log("129 date: ", workoutSessionData.date);
    console.log("130 exercises: ", workoutSessionData.exercises);

    // Create the workout session
    await apiRequest('workout_sessions', 'POST', {
      athlete_id: workoutSessionData.athlete_id,  // Ensure athleteID is being sent
      date: workoutSessionData.date,  // Date of the workout session
    });

    console.log("Session created, fetching session by athlete_id and date");

    // Fetch session to get sessionId using athlete_id and date
    const sessionFetch = await apiRequest(`workout_sessions?athlete_id=eq.${workoutSessionData.athlete_id}&date=eq.${workoutSessionData.date}`, 'GET');
    const sessionId = sessionFetch[0]?.id;

    if (!sessionId) {
      throw new Error('Session ID not found after session creation.');
    }

    console.log("sessionresponse: ", sessionFetch);
    console.log("sessionID: ", sessionId);

    // Now create workout details for each exercise
    for (const exercise of workoutSessionData.exercises) {
      const { name, sets, instructions, reps, weight } = exercise;

      // Find the exercise ID based on name
      const exerciseFetch = await apiRequest(`exercises?name=eq.${name}`, 'GET');
      const exerciseId = exerciseFetch[0]?.id;

      if (!exerciseId) {
        throw new Error(`Exercise ID not found for exercise: ${name}`);
      }

      console.log("ExerciseId: ", exerciseId);
      // Insert workout details
      await apiRequest('workout_details', 'POST', {
        workout_session_id: sessionId,  // Foreign key to the workout session
        exercise_id: exerciseId,  // Exercise being performed
        instructions: instructions,  // Instructions for the exercise
      });

      // Fetch the workout_detail_id using workout_session_id and exercise_id
      const workoutDetailFetch = await apiRequest(
        `workout_details?workout_session_id=eq.${sessionId}&exercise_id=eq.${exerciseId}`,
        'GET'
      );
      const workoutDetailId = workoutDetailFetch[0]?.id;  // Retrieve the workout_detail_id
      console.log("Workout Detail ID:", workoutDetailId);

      if (!workoutDetailId) {
        throw new Error('Workout Detail ID not found');
      }

      // Now insert each set
      for (let i = 0; i < sets; i++) {
        console.log("index: ", i);
        console.log("sessionID: ", sessionId);
        console.log("exerciseID: ", exerciseId);
        console.log("set number: ", i + 1);
        console.log("reps[i]: ", reps[i]);
        console.log("weight[i]: ", weight[i]);

        await apiRequest('workout_sets', 'POST', {
          workout_detail_id: workoutDetailId,  // Foreign key to the workout details
          set_number: i + 1,  // Set number (1-indexed)
          reps: reps[i],  // Number of reps for this set
          weight: weight[i],  // Weight for this set
        });

        console.log(`Set ${i + 1}: Reps ${reps[i]}, Weight ${weight[i]}`);
      }

    }
  } catch (error) {
    console.error('Error saving workout session:', error);
    throw error;
  }
};

