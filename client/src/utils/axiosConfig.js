import axios from 'axios';

// API configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  API_PREFIX: '/ekmate/api/v1',
  TIMEOUT: 30000
};

// Create a custom axios instance with optimized configuration
const axiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}`,
  withCredentials: false,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to handle auth and errors
axiosInstance.interceptors.request.use(
  config => {
    // Only add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Remove any unnecessary headers
    delete config.headers['X-Requested-With'];

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear stored tokens and redirect to login if token is invalid/expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/signin')) {
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);

export { API_CONFIG };
export default axiosInstance;
