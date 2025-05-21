import axiosInstance from '../utils/axiosConfig';

/**
 * Authentication service for handling user authentication
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise with registration result
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/sign-up', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  /**
   * Verify OTP for email verification
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @returns {Promise} Promise with verification result
   */
  verifyOTP: async (email, otp) => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'OTP verification failed' };
    }
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Promise with login result
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/sign-in', { email, password });

      if (response.data.success) {
        const token = response.data.data;

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Decode token to get user info
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const user = JSON.parse(jsonPayload);

        return { success: true, user };
      } else {
        throw response.data;
      }
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Get current user from token in localStorage
   * @returns {Object|null} Current user or null
   */
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // Decode the JWT token to get user information
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
