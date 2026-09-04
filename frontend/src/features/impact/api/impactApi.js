import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/impact';

export const fetchImpactStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching impact stats:', error);
    throw error;
  }
};

export const fetchImpactStories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching impact stories:', error);
    throw error;
  }
};

export const fetchImpactProblem = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/problem`);
    return response.data;
  } catch (error) {
    console.error('Error fetching impact problem:', error);
    throw error;
  }
};
