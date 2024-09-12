const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getClients = () => axios.get(`${API_BASE_URL}/clients`);
export const createWorkoutProgram = (data) => axios.post(`${API_BASE_URL}/workout-programs`, data);