import BusAnalytics from "../models/bus-analytics-model.js";

class BusAnalyticsRepository {
    async create(payload) {
        try {
            const analytics = await BusAnalytics.create(payload);
            console.log("New bus analytics created successfully, create method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to create bus analytics, create method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const analytics = await BusAnalytics.findById(id);
            if (!analytics) {
                console.log("No analytics found with the given ID.");
                throw new Error("analytics not found");
            }
            console.log("Analytics found successfully, findById method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to find analytics, findById method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async findByBusIdAndDate(busId, date) {
        try {
            // Create start and end of the day for the given date
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            
            const analytics = await BusAnalytics.findOne({
                busId,
                date: { $gte: startDate, $lte: endDate }
            });
            
            console.log("Analytics found successfully, findByBusIdAndDate method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to find analytics, findByBusIdAndDate method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async getAnalyticsForDateRange(busId, startDate, endDate) {
        try {
            const analytics = await BusAnalytics.getAnalyticsForDateRange(busId, startDate, endDate);
            console.log("Analytics found successfully, getAnalyticsForDateRange method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to find analytics, getAnalyticsForDateRange method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async getPeakHourData(date) {
        try {
            const peakHourData = await BusAnalytics.getPeakHourData(date);
            console.log("Peak hour data found successfully, getPeakHourData method called successfully from BusAnalyticsRepository");
            return peakHourData;
        } catch (error) {
            console.log("Unable to find peak hour data, getPeakHourData method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const analytics = await BusAnalytics.findByIdAndUpdate(id, payload, { new: true });
            if (!analytics) {
                console.log("No analytics found with the given ID.");
                throw new Error("analytics not found");
            }
            console.log("Analytics updated successfully, update method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to update analytics, update method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }

    async updateOrCreateByBusIdAndDate(busId, date, payload) {
        try {
            // Create start and end of the day for the given date
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            
            const analytics = await BusAnalytics.findOneAndUpdate(
                {
                    busId,
                    date: { $gte: startDate, $lte: endDate }
                },
                payload,
                { new: true, upsert: true }
            );
            
            console.log("Analytics updated or created successfully, updateOrCreateByBusIdAndDate method called successfully from BusAnalyticsRepository");
            return analytics;
        } catch (error) {
            console.log("Unable to update or create analytics, updateOrCreateByBusIdAndDate method called from BusAnalyticsRepository and throws error: ", error);
            throw error;
        }
    }
}

export default BusAnalyticsRepository;
