const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseBody = await response.text();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return responseBody ? JSON.parse(responseBody) : {}; // Return parsed JSON if there's a response body
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

// Fetch athlete details
export const fetchAthleteDetails = async () => apiRequest('athlete_details');

// Delete athlete and related user
export const deleteAthlete = async (athleteId) => {
  const athleteResponse = await apiRequest(`athletes?id=eq.${athleteId}`, 'GET');
  const userId = athleteResponse[0]?.user_id;
  
  if (userId) {
    await apiRequest(`athletes?id=eq.${athleteId}`, 'DELETE');
    await apiRequest(`users?id=eq.${userId}`, 'DELETE');
    console.log(`Athlete ${athleteId} and user ${userId} deleted.`);
  } else {
    throw new Error(`No user found for athlete ID ${athleteId}`);
  }
};

// Add athlete
export const addAthlete = async (newAthlete) => {
  await apiRequest('users', 'POST', {
    name: newAthlete.name,
    email: newAthlete.email,
    role: 'client',
  });

  const userFetchResponse = await apiRequest(`users?email=eq.${newAthlete.email}`, 'GET');
  const userId = userFetchResponse[0]?.id;
  
  if (!userId) throw new Error('User ID could not be retrieved');
  
  return apiRequest('athletes', 'POST', {
    user_id: JSON.stringify(userId),
    age: newAthlete.age,
    fitness_goals: newAthlete.fitness_goals,
    medical_conditions: newAthlete.medical_conditions,
  });
};

// Fetch available exercises
export const fetchExercises = async () => apiRequest('exercises', 'GET');

// Add a new exercise
export const addNewExercise = async (exerciseName) => apiRequest('exercises', 'POST', { name: exerciseName });

// Delete an exercise
export const deleteExercise = async (exerciseId) => {
  await apiRequest(`exercises?id=eq.${exerciseId}`, 'DELETE');
  console.log(`Exercise ${exerciseId} deleted.`);
};

// Save a workout session
export const saveWorkoutSession = async (workoutSessionData) => {
  const { athlete_id, date, exercises } = workoutSessionData;

  // Create workout session
  await apiRequest('workout_sessions', 'POST', { athlete_id, date });
  
  // Fetch session ID by athlete_id and date
  const sessionFetch = await apiRequest(`workout_sessions?athlete_id=eq.${athlete_id}&date=eq.${date}`, 'GET');
  const sessionId = sessionFetch[0]?.id;

  if (!sessionId) throw new Error('Session ID not found after session creation.');

  // Create workout details and sets
  for (const { name, sets, instructions, reps, weight } of exercises) {
    const exerciseFetch = await apiRequest(`exercises?name=eq.${name}`, 'GET');
    const exerciseId = exerciseFetch[0]?.id;

    if (!exerciseId) throw new Error(`Exercise ID not found for ${name}`);

    // Insert workout details
    await apiRequest('workout_details', 'POST', { workout_session_id: sessionId, exercise_id: exerciseId, instructions });
    
    const workoutDetailFetch = await apiRequest(`workout_details?workout_session_id=eq.${sessionId}&exercise_id=eq.${exerciseId}`, 'GET');
    const workoutDetailId = workoutDetailFetch[0]?.id;

    if (!workoutDetailId) throw new Error('Workout Detail ID not found');

    // Insert sets
    for (let i = 0; i < sets; i++) {
      await apiRequest('workout_sets', 'POST', {
        workout_detail_id: workoutDetailId,
        set_number: i + 1,
        reps: reps[i],
        weight: weight[i],
      });
    }
  }
};

// Fetch workout sessions for a specific athlete
export const fetchWorkoutSessions = async (athleteId) => {
  return apiRequest(`workout_sessions?athlete_id=eq.${athleteId}`, 'GET');
};

// Delete workout session and cascade delete workout details and sets
export const deleteWorkoutSession = async (athleteId, date) => {
  await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'DELETE');
  console.log(`Workout session for athlete ${athleteId} on ${date} deleted.`);
};

// Fetch full workout session details
export const fetchWorkoutSessionDetails = async (athleteId, date) => {
  const sessionResponse = await apiRequest(`workout_sessions?athlete_id=eq.${athleteId}&date=eq.${date}`, 'GET');
  if (!sessionResponse || sessionResponse.length === 0) throw new Error('Workout session not found');

  const sessionId = sessionResponse[0].id;

  const detailsResponse = await apiRequest(`workout_details?workout_session_id=eq.${sessionId}`, 'GET');

  const exercises = await Promise.all(detailsResponse.map(async (detail) => {
    const exerciseResponse = await apiRequest(`exercises?id=eq.${detail.exercise_id}`, 'GET');
    const setsResponse = await apiRequest(`workout_sets?workout_detail_id=eq.${detail.id}`, 'GET');

    return {
      name: exerciseResponse[0].name,
      instructions: detail.instructions,
      sets: setsResponse.length,
      reps: setsResponse.map(set => set.reps),
      weight: setsResponse.map(set => set.weight),
    };
  }));

  return { id: sessionId, exercises };
};


/* ----------------- API CALLS FOR ANALYTICS -------------------------- */
export const fetchPerformanceOverview = async (athleteId) => {
  return apiRequest(`exercise_performance?athlete_id=eq.${athleteId}`, 'GET');
};

export const fetchWorkoutTrends = async (athleteId) => {
  return apiRequest(`workout_trends?athlete_id=eq.${athleteId}`, 'GET');
};

// Fetch exercise performance for a specific athlete and exercise
export const fetchExercisePerformance = async (athleteId, exerciseId) => {
  return apiRequest(`exercise_performance?athlete_id=eq.${athleteId}&exercise_id=eq.${exerciseId}`, 'GET');
};


export const fetchTotalWorkouts = async (athleteId) => {
  return apiRequest(`workout_sessions?athlete_id=eq.${athleteId}`, 'GET');
};


export const fetchExerciseConsistency = async (athleteId, exerciseId) => {
  return apiRequest(`exercise_performance?athlete_id=eq.${athleteId}&exercise_id=eq.${exerciseId}`, 'GET');
};

export const fetchExerciseProgress = async (athleteId, exerciseId) => {
  return apiRequest(`workout_details?athlete_id=eq.${athleteId}&exercise_id=eq.${exerciseId}&order=workout_session_id.asc`, 'GET');
};

export const fetchTotalWeightLifted = async (athleteId) => {
  return apiRequest(`athlete_total_weight?athlete_id=eq.${athleteId}`, 'GET');
};
