import express from 'express';
const router = express.Router();

// Import middlewares
import { validateEmailOrPhone, validateOTP, validateSignIn } from '../../middlewares/validation-middleware.js';
import { authenticateJWT, isAdmin } from '../../middlewares/auth-middleware.js';

// Import controllers
import { signUp, verifyOTP, signIn } from '../../controllers/user-controller.js';
import { createBus, getBus, getBusById, updateBus, deleteBus } from '../../controllers/bus-controller.js';
import { createQuery } from '../../controllers/contact-form-controller.js';

// Import new controllers
import {
    createLocation,
    getLatestLocation,
    getLocationHistory,
    updateLocation,
    getAllActiveLocations,
    calculateETA
} from '../../controllers/gps-location-controller.js';

import {
    createOrUpdatePreferences,
    getUserPreferences,
    addFavoriteRoute,
    removeFavoriteRoute,
    updateNotificationSettings,
    updateClassSchedule,
    getFavoriteRoutes
} from '../../controllers/user-preferences-controller.js';

import {
    createFeedback,
    getFeedbackById,
    getFeedbackByBusId,
    getFeedbackByUserId,
    updateFeedback,
    respondToFeedback,
    getAverageRating,
    getFeedbackStats,
    getPendingFeedback
} from '../../controllers/feedback-controller.js';

import {
    createAnalytics,
    getAnalyticsById,
    getAnalyticsByBusIdAndDate,
    getAnalyticsForDateRange,
    getPeakHourData,
    updateAnalytics,
    updateOrCreateAnalytics,
    recordPassengerCount
} from '../../controllers/bus-analytics-controller.js';

import {
    createEvent,
    getEventById,
    getEventsByOrganizer,
    getUpcomingEvents,
    getPendingEvents,
    updateEvent,
    assignBusToEvent,
    updateEventStatus,
    approveEvent,
    cancelEvent
} from '../../controllers/event-transportation-controller.js';

import {
    createMaintenance,
    getMaintenanceById,
    getMaintenanceByBusId,
    getUpcomingMaintenance,
    getMaintenanceHistory,
    updateMaintenance,
    updateMaintenanceStatus,
    markMaintenanceAsCompleted,
    scheduleMaintenance
} from '../../controllers/bus-maintenance-controller.js';

import {
    createDriver,
    getDriverById,
    getAllDrivers,
    getActiveDrivers,
    getDriversWithExpiringLicenses,
    updateDriver,
    assignBus,
    sendOTP,
    verifyOTP as verifyDriverOTP,
    signIn as driverSignIn
} from '../../controllers/driver-controller.js';

// Authentication routes
router.post('/auth/sign-up', validateEmailOrPhone, signUp);
router.post('/auth/verify-otp', validateOTP, verifyOTP);
router.post('/auth/sign-in', validateSignIn, signIn);

// Driver authentication routes
router.post('/driver/auth/sign-up', createDriver);
router.post('/driver/auth/send-otp', sendOTP);
router.post('/driver/auth/verify-otp', verifyDriverOTP);
router.post('/driver/auth/sign-in', driverSignIn);

// Bus routes
router.post('/buses', authenticateJWT, isAdmin, createBus);
router.get('/buses', getBus);
router.get('/buses/:id', getBusById);
router.put('/buses/:id', authenticateJWT, isAdmin, updateBus);
router.delete('/buses/:id', authenticateJWT, isAdmin, deleteBus);

// Contact form routes
router.post('/contact-form-query', createQuery);

// GPS Location routes
router.post('/gps-locations', authenticateJWT, createLocation);
router.get('/gps-locations/buses/:busId/latest', getLatestLocation);
router.get('/gps-locations/buses/:busId/history', getLocationHistory);
router.put('/gps-locations/:id', authenticateJWT, updateLocation);
router.get('/gps-locations/active', getAllActiveLocations);
router.get('/gps-locations/buses/:busId/eta', calculateETA);

// User Preferences routes
router.post('/users/:userId/preferences', authenticateJWT, createOrUpdatePreferences);
router.get('/users/:userId/preferences', authenticateJWT, getUserPreferences);
router.post('/users/:userId/favorite-routes', authenticateJWT, addFavoriteRoute);
router.delete('/users/:userId/favorite-routes', authenticateJWT, removeFavoriteRoute);
router.put('/users/:userId/notification-settings', authenticateJWT, updateNotificationSettings);
router.put('/users/:userId/class-schedule', authenticateJWT, updateClassSchedule);
router.get('/users/:userId/favorite-routes', authenticateJWT, getFavoriteRoutes);

// Feedback routes
router.post('/feedback', authenticateJWT, createFeedback);
router.get('/feedback/:id', getFeedbackById);
router.get('/feedback/buses/:busId', getFeedbackByBusId);
router.get('/feedback/users/:userId', authenticateJWT, getFeedbackByUserId);
router.put('/feedback/:id', authenticateJWT, updateFeedback);
router.put('/feedback/:id/respond', authenticateJWT, isAdmin, respondToFeedback);
router.get('/feedback/buses/:busId/rating', getAverageRating);
router.get('/feedback/buses/:busId/stats', getFeedbackStats);
router.get('/feedback/pending', authenticateJWT, isAdmin, getPendingFeedback);

// Bus Analytics routes
router.post('/analytics', authenticateJWT, isAdmin, createAnalytics);
router.get('/analytics/:id', authenticateJWT, isAdmin, getAnalyticsById);
router.get('/analytics/buses/:busId', authenticateJWT, isAdmin, getAnalyticsByBusIdAndDate);
router.get('/analytics/buses/:busId/date-range', authenticateJWT, isAdmin, getAnalyticsForDateRange);
router.get('/analytics/peak-hours', authenticateJWT, isAdmin, getPeakHourData);
router.put('/analytics/:id', authenticateJWT, isAdmin, updateAnalytics);
router.put('/analytics/buses/:busId', authenticateJWT, isAdmin, updateOrCreateAnalytics);
router.post('/analytics/buses/:busId/passenger-count', authenticateJWT, recordPassengerCount);

// Event Transportation routes
router.post('/events', authenticateJWT, createEvent);
router.get('/events/:id', getEventById);
router.get('/events/organizers/:organizerId', authenticateJWT, getEventsByOrganizer);
router.get('/events/upcoming', getUpcomingEvents);
router.get('/events/pending', authenticateJWT, isAdmin, getPendingEvents);
router.put('/events/:id', authenticateJWT, updateEvent);
router.post('/events/:id/assign-bus', authenticateJWT, isAdmin, assignBusToEvent);
router.put('/events/:id/status', authenticateJWT, isAdmin, updateEventStatus);
router.put('/events/:id/approve', authenticateJWT, isAdmin, approveEvent);
router.put('/events/:id/cancel', authenticateJWT, isAdmin, cancelEvent);

// Bus Maintenance routes
router.post('/maintenance', authenticateJWT, isAdmin, createMaintenance);
router.get('/maintenance/:id', authenticateJWT, getMaintenanceById);
router.get('/maintenance/buses/:busId', authenticateJWT, getMaintenanceByBusId);
router.get('/maintenance/upcoming', authenticateJWT, isAdmin, getUpcomingMaintenance);
router.get('/maintenance/buses/:busId/history', authenticateJWT, getMaintenanceHistory);
router.put('/maintenance/:id', authenticateJWT, isAdmin, updateMaintenance);
router.put('/maintenance/:id/status', authenticateJWT, isAdmin, updateMaintenanceStatus);
router.put('/maintenance/:id/complete', authenticateJWT, isAdmin, markMaintenanceAsCompleted);
router.post('/maintenance/buses/:busId/schedule', authenticateJWT, isAdmin, scheduleMaintenance);

// Driver routes
router.get('/drivers/:id', authenticateJWT, getDriverById);
router.get('/drivers', authenticateJWT, isAdmin, getAllDrivers);
router.get('/drivers/active', authenticateJWT, isAdmin, getActiveDrivers);
router.get('/drivers/expiring-licenses', authenticateJWT, isAdmin, getDriversWithExpiringLicenses);
router.put('/drivers/:id', authenticateJWT, isAdmin, updateDriver);
router.post('/drivers/:id/assign-bus', authenticateJWT, isAdmin, assignBus);

export default router;