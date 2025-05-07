import axiosInstance from '../utils/axiosConfig';

/**
 * Bus service for handling bus-related API calls
 */
const busService = {
  /**
   * Get all buses
   * @returns {Promise} Promise with buses data
   */
  getAllBuses: async () => {
    try {
      const response = await axiosInstance.get('/buses');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch buses' };
    }
  },

  /**
   * Get bus by ID
   * @param {string} id - Bus ID
   * @returns {Promise} Promise with bus data
   */
  getBusById: async (id) => {
    try {
      const response = await axiosInstance.get(`/buses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch bus details' };
    }
  },

  /**
   * Get latest location of a bus
   * @param {string} busId - Bus ID
   * @returns {Promise} Promise with location data
   */
  getLatestLocation: async (busId) => {
    try {
      const response = await axiosInstance.get(`/gps-locations/buses/${busId}/latest`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch bus location' };
    }
  },

  /**
   * Get all active bus locations
   * @returns {Promise} Promise with active locations data
   */
  getAllActiveLocations: async () => {
    try {
      const response = await axiosInstance.get('/gps-locations/active');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch active locations' };
    }
  },

  /**
   * Calculate ETA for a bus
   * @param {string} busId - Bus ID
   * @returns {Promise} Promise with ETA data
   */
  calculateETA: async (busId) => {
    try {
      const response = await axiosInstance.get(`/gps-locations/buses/${busId}/eta`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to calculate ETA' };
    }
  }
};

export default busService;
