import BusAnalyticsRepository from "../repositories/bus-analytics-repository.js";
import BusRepository from "../repositories/bus-repository.js";

class BusAnalyticsService {
    constructor() {
        this.busAnalyticsRepository = new BusAnalyticsRepository();
        this.busRepository = new BusRepository();
    }

    async createAnalytics(payload) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(payload.busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const analytics = await this.busAnalyticsRepository.create(payload);
            console.log("createAnalytics method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("createAnalytics method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async getAnalyticsById(id) {
        try {
            const analytics = await this.busAnalyticsRepository.findById(id);
            console.log("getAnalyticsById method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("getAnalyticsById method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async getAnalyticsByBusIdAndDate(busId, date) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const analytics = await this.busAnalyticsRepository.findByBusIdAndDate(busId, date);
            console.log("getAnalyticsByBusIdAndDate method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("getAnalyticsByBusIdAndDate method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async getAnalyticsForDateRange(busId, startDate, endDate) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const analytics = await this.busAnalyticsRepository.getAnalyticsForDateRange(busId, startDate, endDate);
            console.log("getAnalyticsForDateRange method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("getAnalyticsForDateRange method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async getPeakHourData(date) {
        try {
            const peakHourData = await this.busAnalyticsRepository.getPeakHourData(date);
            console.log("getPeakHourData method called successfully from BusAnalyticsService");
            return peakHourData;
        } catch (error) {
            console.log("getPeakHourData method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async updateAnalytics(id, payload) {
        try {
            const analytics = await this.busAnalyticsRepository.update(id, payload);
            console.log("updateAnalytics method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("updateAnalytics method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async updateOrCreateAnalytics(busId, date, payload) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const analytics = await this.busAnalyticsRepository.updateOrCreateByBusIdAndDate(busId, date, payload);
            console.log("updateOrCreateAnalytics method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("updateOrCreateAnalytics method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }

    async recordPassengerCount(busId, pickupPoint, passengerCount) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const today = new Date();
            
            // Try to find existing analytics for today
            let analytics = await this.busAnalyticsRepository.findByBusIdAndDate(busId, today);
            
            if (!analytics) {
                // Create new analytics if none exist
                analytics = await this.busAnalyticsRepository.create({
                    busId,
                    date: today,
                    routeData: [],
                    totalPassengers: 0,
                    averageOccupancy: 0,
                    peakHours: []
                });
            }
            
            // Find the route data for the pickup point
            const routeDataIndex = analytics.routeData.findIndex(
                route => route.pickupPoint === pickupPoint
            );
            
            if (routeDataIndex >= 0) {
                // Update existing route data
                analytics.routeData[routeDataIndex].passengerCount = passengerCount;
            } else {
                // Add new route data
                analytics.routeData.push({
                    pickupPoint,
                    scheduledTime: '',
                    actualTime: '',
                    delay: 0,
                    passengerCount,
                    capacity: bus.capacity
                });
            }
            
            // Update total passengers
            analytics.totalPassengers = analytics.routeData.reduce(
                (total, route) => total + route.passengerCount, 0
            );
            
            // Update average occupancy
            analytics.averageOccupancy = (analytics.totalPassengers / (bus.capacity * analytics.routeData.length)) * 100;
            
            // Update peak hours
            const currentHour = today.getHours();
            const peakHourIndex = analytics.peakHours.findIndex(peak => peak.hour === currentHour);
            
            if (peakHourIndex >= 0) {
                // Update existing peak hour
                analytics.peakHours[peakHourIndex].passengerCount = Math.max(
                    analytics.peakHours[peakHourIndex].passengerCount,
                    passengerCount
                );
            } else {
                // Add new peak hour
                analytics.peakHours.push({
                    hour: currentHour,
                    passengerCount
                });
            }
            
            // Save the updated analytics
            await this.busAnalyticsRepository.update(analytics._id, analytics);
            
            console.log("recordPassengerCount method called successfully from BusAnalyticsService");
            return analytics;
        } catch (error) {
            console.log("recordPassengerCount method called from BusAnalyticsService and throws error: ", error);
            throw error;
        }
    }
}

export default BusAnalyticsService;
