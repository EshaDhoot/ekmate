import axios from 'axios';

// Create a custom axios instance with optimized configuration
const axiosInstance = axios.create({
  // Don't send cookies to avoid large headers
  withCredentials: false,
  
  // Set reasonable timeouts
  timeout: 30000,
  
  // Limit headers to essentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to keep headers minimal
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

export default axiosInstance;
