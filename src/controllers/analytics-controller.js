import BusService from "../services/bus-service.js";
import RouteService from "../services/route-service.js";
import UserService from "../services/user-service.js";
import FeedbackService from "../services/feedback-service.js";
import EventTransportationService from "../services/event-transportation-service.js";
import BusMaintenanceService from "../services/bus-maintenance-service.js";

const busService = new BusService();
const routeService = new RouteService();
const userService = new UserService();
const feedbackService = new FeedbackService();
const eventService = new EventTransportationService();
const maintenanceService = new BusMaintenanceService();

/**
 * Get bus utilization analytics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getBusUtilization = async (req, res) => {
    try {
        // Get all buses
        const busesData = await busService.getAll({});
        const buses = busesData.buses || [];

        // Calculate utilization metrics
        const utilization = buses.map(bus => {
            // Calculate utilization based on capacity and average passengers
            const capacityUtilization = bus.capacity > 0 ? 
                (bus.averagePassengers || 0) / bus.capacity * 100 : 0;
            
            return {
                busId: bus._id,
                busNumber: bus.busNumber,
                capacity: bus.capacity,
                averagePassengers: bus.averagePassengers || 0,
                capacityUtilization: Math.round(capacityUtilization),
                status: bus.status,
                lastMaintenance: bus.lastMaintenance,
                nextMaintenance: bus.nextMaintenance
            };
        });

        return res.status(200).json({
            data: utilization,
            message: "Bus utilization analytics fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch bus utilization analytics, error from analytics-controller: ", error);
        return res.status(500).json({
            data: [],
            message: "Unable to fetch bus utilization analytics",
            error: error.message,
            success: false
        });
    }
};

/**
 * Get route distribution analytics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getRouteDistribution = async (req, res) => {
    try {
        // Get all routes
        const routesData = await routeService.getAllRoutes();
        const routes = routesData.routes || [];

        // Calculate distribution metrics
        const distribution = routes.map(route => {
            return {
                routeId: route._id,
                routeName: route.name,
                startLocation: route.startLocation,
                endLocation: route.endLocation,
                distance: route.distance,
                estimatedTime: route.estimatedTime,
                busCount: route.busCount || 0,
                passengerCount: route.passengerCount || 0
            };
        });

        return res.status(200).json({
            data: distribution,
            message: "Route distribution analytics fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch route distribution analytics, error from analytics-controller: ", error);
        return res.status(500).json({
            data: [],
            message: "Unable to fetch route distribution analytics",
            error: error.message,
            success: false
        });
    }
};

/**
 * Get overall statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getStats = async (req, res) => {
    try {
        // Get counts from different services
        const busesData = await busService.getAll({});
        const routesData = await routeService.getAllRoutes();
        const usersCount = await userService.getUsersCount();
        
        // Calculate average ratings
        const buses = busesData.buses || [];
        let totalRating = 0;
        let ratedBuses = 0;
        
        for (const bus of buses) {
            if (bus.rating && bus.rating > 0) {
                totalRating += bus.rating;
                ratedBuses++;
            }
        }
        
        const averageRating = ratedBuses > 0 ? (totalRating / ratedBuses).toFixed(1) : 0;
        
        // Compile stats
        const stats = {
            totalBuses: busesData.total || 0,
            activeBuses: buses.filter(bus => bus.status === 'active').length,
            totalRoutes: routesData.total || 0,
            totalUsers: usersCount || 0,
            averageRating: parseFloat(averageRating),
            maintenanceCount: buses.filter(bus => bus.status === 'maintenance').length
        };

        return res.status(200).json({
            data: stats,
            message: "Analytics statistics fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch analytics statistics, error from analytics-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch analytics statistics",
            error: error.message,
            success: false
        });
    }
};
