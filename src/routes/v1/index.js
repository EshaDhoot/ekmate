import express from 'express';
const router = express.Router();

import { validateEmailOrPhone, validateOTP, validateSignIn } from '../../middlewares/validation-middleware.js';
import { authenticateJWT, isAdmin } from '../../middlewares/auth-middleware.js';

import {
    signUp,
    verifyOTP,
    verifyAdminOTP,
    signIn,
    getCurrentUser,
    updateUserProfile,
    changePassword,
    uploadProfilePicture,
    upload,
    getAllUsers
} from '../../controllers/user-controller.js';
import { createBus, getBus, getBusById, updateBus, deleteBus } from '../../controllers/bus-controller.js';
import { createQuery } from '../../controllers/contact-form-controller.js';

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
    getPendingFeedback,
    getAllFeedback
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
    getUpcomingEvents,
    getPendingEvents,
    updateEvent,
    assignBusToEvent,
    updateEventStatus,
    approveEvent,
    cancelEvent,
    getAllEvents
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
    scheduleMaintenance,
    getAllMaintenance
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

// Import admin controller
import {
    getDashboardStats,
    getRecentActivities,
    getAdminUpcomingEvents
} from '../../controllers/admin-controller.js';

// Import analytics controller
import {
    getBusUtilization,
    getRouteDistribution,
    getStats
} from '../../controllers/analytics-controller.js';

// Authentication routes
router.post('/auth/sign-up', validateEmailOrPhone, signUp);
router.post('/auth/verify-otp', validateOTP, verifyOTP);
router.post('/auth/sign-in', validateSignIn, signIn);
router.post('/auth/verify-admin-otp', validateOTP, verifyAdminOTP);

// User routes
router.get('/users', authenticateJWT, isAdmin, getAllUsers);
router.get('/users/me', authenticateJWT, getCurrentUser);
router.put('/users/me', authenticateJWT, updateUserProfile);
router.put('/users/change-password', authenticateJWT, changePassword);
router.post('/users/me/profile-picture', authenticateJWT, upload.single('profilePicture'), uploadProfilePicture);

// Driver authentication routes
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
router.get('/gps-locations/active', getAllActiveLocations);
router.get('/gps-locations/buses/:busId/latest', getLatestLocation);
router.get('/gps-locations/buses/:busId/history', getLocationHistory);
router.get('/gps-locations/buses/:busId/eta', calculateETA);
// Generic :id route should come after specific routes
router.put('/gps-locations/:id', authenticateJWT, updateLocation);

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
// Define specific routes before the generic :id route
router.get('/feedback', getAllFeedback);
router.get('/feedback/buses/:busId', getFeedbackByBusId);
router.get('/feedback/users/:userId', authenticateJWT, getFeedbackByUserId);
router.get('/feedback/buses/:busId/rating', getAverageRating);
router.get('/feedback/buses/:busId/stats', getFeedbackStats);
router.get('/feedback/pending', authenticateJWT, isAdmin, getPendingFeedback);
// Generic :id route should come after specific routes
router.get('/feedback/:id', getFeedbackById);
router.put('/feedback/:id', authenticateJWT, updateFeedback);
router.put('/feedback/:id/respond', authenticateJWT, isAdmin, respondToFeedback);

// Analytics routes (from analytics-controller.js)
router.get('/analytics/bus-utilization', authenticateJWT, isAdmin, getBusUtilization);
router.get('/analytics/route-distribution', authenticateJWT, isAdmin, getRouteDistribution);
router.get('/analytics/stats', authenticateJWT, isAdmin, getStats);

// Bus Analytics routes (from bus-analytics-controller.js)
router.post('/analytics', authenticateJWT, isAdmin, createAnalytics);
// Define specific routes before the generic :id route
router.get('/analytics/buses/:busId', authenticateJWT, isAdmin, getAnalyticsByBusIdAndDate);
router.get('/analytics/buses/:busId/date-range', authenticateJWT, isAdmin, getAnalyticsForDateRange);
router.get('/analytics/peak-hours', authenticateJWT, isAdmin, getPeakHourData);
router.put('/analytics/buses/:busId', authenticateJWT, isAdmin, updateOrCreateAnalytics);
router.post('/analytics/buses/:busId/passenger-count', authenticateJWT, recordPassengerCount);
// Generic :id route should come after specific routes
router.get('/analytics/:id', authenticateJWT, isAdmin, getAnalyticsById);
router.put('/analytics/:id', authenticateJWT, isAdmin, updateAnalytics);

// Event Transportation routes
router.post('/events', authenticateJWT, isAdmin, createEvent);
// Define specific routes before the generic :id route
router.get('/events', getAllEvents);
router.get('/events/upcoming', getUpcomingEvents);
router.get('/events/pending', authenticateJWT, isAdmin, getPendingEvents);
// Generic :id route should come after specific routes
router.get('/events/:id', authenticateJWT, getEventById);
router.put('/events/:id', authenticateJWT, isAdmin, updateEvent);
router.post('/events/:id/assign-bus', authenticateJWT, isAdmin, assignBusToEvent);
router.put('/events/:id/status', authenticateJWT, isAdmin, updateEventStatus);
router.put('/events/:id/approve', authenticateJWT, isAdmin, approveEvent);
router.put('/events/:id/cancel', authenticateJWT, isAdmin, cancelEvent);

// Bus Maintenance routes
router.post('/maintenance', authenticateJWT, isAdmin, createMaintenance);
// Define specific routes before the generic :id route
router.get('/maintenance', getAllMaintenance);
router.get('/maintenance/upcoming', authenticateJWT, isAdmin, getUpcomingMaintenance);
router.get('/maintenance/buses/:busId', authenticateJWT, getMaintenanceByBusId);
router.get('/maintenance/buses/:busId/history', authenticateJWT, getMaintenanceHistory);
router.post('/maintenance/buses/:busId/schedule', authenticateJWT, isAdmin, scheduleMaintenance);
// Generic :id route should come after specific routes
router.get('/maintenance/:id', authenticateJWT, getMaintenanceById);
router.put('/maintenance/:id', authenticateJWT, isAdmin, updateMaintenance);
router.put('/maintenance/:id/status', authenticateJWT, isAdmin, updateMaintenanceStatus);
router.put('/maintenance/:id/complete', authenticateJWT, isAdmin, markMaintenanceAsCompleted);

// Driver routes
router.post('/drivers', authenticateJWT, isAdmin, createDriver);
router.get('/drivers', authenticateJWT, isAdmin, getAllDrivers);
router.get('/drivers/active', authenticateJWT, isAdmin, getActiveDrivers);
router.get('/drivers/expiring-licenses', authenticateJWT, isAdmin, getDriversWithExpiringLicenses);
// Generic :id route should come after specific routes
router.get('/drivers/:id', authenticateJWT, getDriverById);
router.put('/drivers/:id', authenticateJWT, isAdmin, updateDriver);
router.post('/drivers/:id/assign-bus', authenticateJWT, isAdmin, assignBus);

// Admin dashboard routes
router.get('/admin/dashboard/stats', authenticateJWT, isAdmin, getDashboardStats);
router.get('/admin/activities/recent', authenticateJWT, isAdmin, getRecentActivities);
router.get('/admin/events/upcoming', authenticateJWT, isAdmin, getAdminUpcomingEvents);

export default router;