const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/'; // Your PostgREST URL

// JWT Token
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

export const fetchAthletes = async () => {
  try {
    const response = await fetch(`${API_URL}athlete_details`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching clients: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addAthlete = async (newAthlete) => {
  try {
    // Step 1: Add to the users table first
    const userResponse = await fetch(`${API_URL}users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newAthlete.name,
        email: newAthlete.email,
        role: 'client',  // Add the user as a client by default
      }),
    });

    if (!userResponse.ok) {
      throw new Error(`Error adding user: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Step 2: Add the client's details to the clients table
    const clientResponse = await fetch(`${API_URL}clients`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        age: newAthlete.age,
        fitness_goals: newAthlete.fitness_goals,
        medical_conditions: newAthlete.medical_conditions,
      }),
    });

    if (!clientResponse.ok) {
      throw new Error(`Error adding client: ${clientResponse.statusText}`);
    }

    return await clientResponse.json();  // Return the new client data
  } catch (error) {
    console.error(error);
    return null;
  }
};