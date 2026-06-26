import axios from 'axios';

// Create an Axios instance with base URL for the backend API
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 5000,
});

export const fetchSteps = async () => {
  const response = await api.get('/steps');
  return response.data;
};

export const fetchDocuments = async (userType) => {
  const response = await api.get(`/documents?user_type=${userType}`);
  return response.data;
};

export const fetchCityInfo = async (city) => {
  const response = await api.get(`/cityinfo?city=${city}`);
  return response.data;
};

export default api;
