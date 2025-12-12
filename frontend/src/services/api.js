import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../constants/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }

    // Handle HTTP errors
    const status = error.response?.status;
    const message = error.response?.data?.error || error.response?.data?.message || 'An error occurred';

    switch (status) {
      case 400:
        throw new Error(`Bad Request: ${message}`);
      case 404:
        throw new Error(`Not Found: ${message}`);
      case 500:
        throw new Error(`Server Error: ${message}`);
      default:
        throw new Error(message);
    }
  }
);

/**
 * Process a batch of names
 * @param {string[]} names - Array of names to process
 * @returns {Promise<Object>} Response data
 */
export const processLeads = async (names) => {
  try {
    if (!Array.isArray(names) || names.length === 0) {
      throw new Error('Names array is required and cannot be empty');
    }

    const response = await apiClient.post(API_ENDPOINTS.PROCESS, { names });
    return response.data;
  } catch (error) {
    console.error('Error processing leads:', error);
    throw error;
  }
};

/**
 * Fetch all leads with optional status filter
 * @param {string} status - Optional status filter
 * @returns {Promise<Array>} Array of leads
 */
export const fetchLeads = async (status = null) => {
  try {
    const url = status && status !== 'All' 
      ? `${API_ENDPOINTS.LEADS}?status=${status}`
      : API_ENDPOINTS.LEADS;
    
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

/**
 * Fetch statistics
 * @returns {Promise<Object>} Statistics object
 */
export const fetchStats = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.STATS);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default apiClient;

