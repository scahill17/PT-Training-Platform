const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/'; // Your PostgREST URL

// JWT Token
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.335mk3DQPt9gHhBcqs8RVonawtHHMXgcHntKZ2Cuits';

export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}clients`, {
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
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWorkoutSessions = async () => {
  try {
    const response = await fetch(`${API_URL}workout_sessions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching workout sessions: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};