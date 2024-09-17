const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
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

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error in ${method} request to ${endpoint}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}: `, error);
    throw error;
  }
};

export const fetchAthleteDetails = async () => {
  return apiRequest('athlete_details');
};

export const deleteAthlete = async (athleteId) => {
  await apiRequest(`athletes?id=eq.${athleteId}`, 'DELETE');
  console.log(`Athlete with ID ${athleteId} deleted successfully.`);
};


export const addAthlete = async (newAthlete) => {
  try {
    // Add to the users table first
    const userResponse = await apiRequest('users', 'POST', {
      name: newAthlete.name,
      email: newAthlete.email,
      role: 'client',
    });

    const userId = userResponse.id;

    // Add to the athletes table
    const athleteResponse = await apiRequest('athletes', 'POST', {
      user_id: userId,
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