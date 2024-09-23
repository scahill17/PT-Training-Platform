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
