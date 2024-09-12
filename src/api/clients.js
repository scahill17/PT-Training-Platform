// -----------------------  ADD POSTGREST URL HERE  -------------------------- //
const API_URL = 'https://your-postgrest-url'; // Replace with your PostgREST API URL

export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
