import axiosInstance from '../utils/axiosConfig';

/**
 * Event service for handling event-related API calls
 */
const eventService = {
  /**
   * Create a new event
   * @param {Object} eventData - Event data
   * @returns {Promise} Promise with created event data
   */
  createEvent: async (eventData) => {
    try {
      const response = await axiosInstance.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create event' };
    }
  },

  /**
   * Get event by ID
   * @param {string} id - Event ID
   * @returns {Promise} Promise with event data
   */
  getEventById: async (id) => {
    try {
      const response = await axiosInstance.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch event details' };
    }
  },

  /**
   * Get events by organizer
   * @param {string} organizerId - Organizer ID
   * @returns {Promise} Promise with events data
   */
  getEventsByOrganizer: async (organizerId) => {
    try {
      const response = await axiosInstance.get(`/events/organizers/${organizerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch organizer events' };
    }
  },

  /**
   * Get upcoming events
   * @returns {Promise} Promise with upcoming events data
   */
  getUpcomingEvents: async () => {
    try {
      const response = await axiosInstance.get('/events/upcoming');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch upcoming events' };
    }
  },

  /**
   * Update an event
   * @param {string} id - Event ID
   * @param {Object} eventData - Updated event data
   * @returns {Promise} Promise with updated event data
   */
  updateEvent: async (id, eventData) => {
    try {
      const response = await axiosInstance.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update event' };
    }
  },

  /**
   * Cancel an event
   * @param {string} id - Event ID
   * @returns {Promise} Promise with cancellation result
   */
  cancelEvent: async (id) => {
    try {
      const response = await axiosInstance.put(`/events/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel event' };
    }
  }
};

export default eventService;
