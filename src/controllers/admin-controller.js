import BusService from "../services/bus-service.js";
import DriverService from "../services/driver-service.js";
import UserService from "../services/user-service.js";
import FeedbackService from "../services/feedback-service.js";
import EventTransportationService from "../services/event-transportation-service.js";
import BusMaintenanceService from "../services/bus-maintenance-service.js";
import RouteService from "../services/route-service.js";

const busService = new BusService();
const driverService = new DriverService();
const userService = new UserService();
const feedbackService = new FeedbackService();
const eventService = new EventTransportationService();
const maintenanceService = new BusMaintenanceService();
const routeService = new RouteService();

/**
 * Get dashboard statistics for admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDashboardStats = async (req, res) => {
    try {
        // Get counts from different services
        const busesData = await busService.getAll({});
        const driversData = await driverService.getAllDrivers(1, 1);
        const usersCount = await userService.getUsersCount();
        const pendingFeedback = await feedbackService.getPendingFeedback(1, 1);
        const upcomingEvents = await eventService.getUpcomingEvents(1, 1);
        const pendingMaintenance = await maintenanceService.getUpcomingMaintenance(1, 1);

        // Compile stats
        const stats = {
            buses: busesData.total || 0,
            drivers: driversData.total || 0,
            users: usersCount || 0,
            events: upcomingEvents.total || 0,
            feedback: pendingFeedback.total || 0,
            maintenance: pendingMaintenance.total || 0
        };

        return res.status(200).json({
            data: stats,
            message: "Dashboard statistics fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch dashboard statistics, error from admin-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch dashboard statistics",
            error: error.message,
            success: false
        });
    }
};

/**
 * Get recent activities for admin dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getRecentActivities = async (req, res) => {
    try {
        const { limit = 5 } = req.query;
        const limitNum = parseInt(limit) || 5;

        // Fetch recent activities from different services
        // For this example, we'll combine recent feedback, maintenance, and events
        const recentFeedback = await feedbackService.getRecentFeedback(limitNum);
        const recentMaintenance = await maintenanceService.getRecentMaintenance(limitNum);
        const recentEvents = await eventService.getRecentEvents(limitNum);

        // Combine and format activities
        let activities = [
            ...recentFeedback.map(item => ({
                type: 'feedback',
                id: item._id,
                title: `New feedback for bus ${item.busId}`,
                description: item.comments?.substring(0, 50) + (item.comments?.length > 50 ? '...' : '') || 'No comments',
                timestamp: item.createdAt,
                status: item.status
            })),
            ...recentMaintenance.map(item => ({
                type: 'maintenance',
                id: item._id,
                title: `Maintenance for bus ${item.busId}`,
                description: item.description?.substring(0, 50) + (item.description?.length > 50 ? '...' : '') || 'No description',
                timestamp: item.createdAt,
                status: item.status
            })),
            ...recentEvents.map(item => ({
                type: 'event',
                id: item._id,
                title: item.eventName || 'Event',
                description: item.description?.substring(0, 50) + (item.description?.length > 50 ? '...' : '') || 'No description',
                timestamp: item.createdAt,
                status: item.status
            }))
        ];

        // Sort by timestamp (newest first) and limit
        activities = activities
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limitNum);

        return res.status(200).json({
            data: activities,
            message: "Recent activities fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch recent activities, error from admin-controller: ", error);
        return res.status(500).json({
            data: [],
            message: "Unable to fetch recent activities",
            error: error.message,
            success: false
        });
    }
};

/**
 * Get upcoming events for admin dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAdminUpcomingEvents = async (req, res) => {
    try {
        const { limit = 5 } = req.query;
        const limitNum = parseInt(limit) || 5;

        // Get upcoming events
        const eventsData = await eventService.getUpcomingEvents(1, limitNum);

        return res.status(200).json({
            data: eventsData.events || [],
            message: "Upcoming events fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch upcoming events, error from admin-controller: ", error);
        return res.status(500).json({
            data: [],
            message: "Unable to fetch upcoming events",
            error: error.message,
            success: false
        });
    }
};
