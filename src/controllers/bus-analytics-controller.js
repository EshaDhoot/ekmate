import BusAnalyticsService from "../services/bus-analytics-service.js";

const busAnalyticsService = new BusAnalyticsService();

export const createAnalytics = async (req, res) => {
    try {
        const analytics = await busAnalyticsService.createAnalytics(req.body);
        return res.status(201).json({
            data: analytics,
            message: "Created bus analytics successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create bus analytics, error from bus-analytics-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to create bus analytics",
            error: error.message,
            success: false
        });
    }
};

export const getAnalyticsById = async (req, res) => {
    try {
        const { id } = req.params;
        const analytics = await busAnalyticsService.getAnalyticsById(id);
        return res.status(200).json({
            data: analytics,
            message: "Fetched bus analytics successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch bus analytics, error from bus-analytics-controller: ", error);
        if (error.message === "analytics not found") {
            return res.status(404).json({
                data: {},
                message: "Analytics not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch bus analytics",
            error: error.message,
            success: false
        });
    }
};

export const getAnalyticsByBusIdAndDate = async (req, res) => {
    try {
        const { busId } = req.params;
        const { date } = req.query;
        
        // If date is not provided, use today's date
        const analyticsDate = date ? new Date(date) : new Date();
        
        const analytics = await busAnalyticsService.getAnalyticsByBusIdAndDate(busId, analyticsDate);
        return res.status(200).json({
            data: analytics,
            message: "Fetched bus analytics by bus ID and date successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch bus analytics by bus ID and date, error from bus-analytics-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch bus analytics by bus ID and date",
            error: error.message,
            success: false
        });
    }
};

export const getAnalyticsForDateRange = async (req, res) => {
    try {
        const { busId } = req.params;
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({
                data: {},
                message: "Start date and end date are required",
                error: "Missing required parameters",
                success: false
            });
        }
        
        const analytics = await busAnalyticsService.getAnalyticsForDateRange(
            busId, 
            new Date(startDate), 
            new Date(endDate)
        );
        
        return res.status(200).json({
            data: analytics,
            message: "Fetched bus analytics for date range successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch bus analytics for date range, error from bus-analytics-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch bus analytics for date range",
            error: error.message,
            success: false
        });
    }
};

export const getPeakHourData = async (req, res) => {
    try {
        const { date } = req.query;
        
        // If date is not provided, use today's date
        const peakDate = date ? new Date(date) : new Date();
        
        const peakHourData = await busAnalyticsService.getPeakHourData(peakDate);
        return res.status(200).json({
            data: peakHourData,
            message: "Fetched peak hour data successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch peak hour data, error from bus-analytics-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch peak hour data",
            error: error.message,
            success: false
        });
    }
};

export const updateAnalytics = async (req, res) => {
    try {
        const { id } = req.params;
        const analytics = await busAnalyticsService.updateAnalytics(id, req.body);
        return res.status(200).json({
            data: analytics,
            message: "Updated bus analytics successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update bus analytics, error from bus-analytics-controller: ", error);
        if (error.message === "analytics not found") {
            return res.status(404).json({
                data: {},
                message: "Analytics not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update bus analytics",
            error: error.message,
            success: false
        });
    }
};

export const updateOrCreateAnalytics = async (req, res) => {
    try {
        const { busId } = req.params;
        const { date } = req.query;
        
        // If date is not provided, use today's date
        const analyticsDate = date ? new Date(date) : new Date();
        
        const analytics = await busAnalyticsService.updateOrCreateAnalytics(busId, analyticsDate, req.body);
        return res.status(200).json({
            data: analytics,
            message: "Updated or created bus analytics successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update or create bus analytics, error from bus-analytics-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update or create bus analytics",
            error: error.message,
            success: false
        });
    }
};

export const recordPassengerCount = async (req, res) => {
    try {
        const { busId } = req.params;
        const { pickupPoint, passengerCount } = req.body;
        
        if (!pickupPoint || passengerCount === undefined) {
            return res.status(400).json({
                data: {},
                message: "Pickup point and passenger count are required",
                error: "Missing required parameters",
                success: false
            });
        }
        
        const analytics = await busAnalyticsService.recordPassengerCount(
            busId, 
            pickupPoint, 
            parseInt(passengerCount)
        );
        
        return res.status(200).json({
            data: analytics,
            message: "Recorded passenger count successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to record passenger count, error from bus-analytics-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to record passenger count",
            error: error.message,
            success: false
        });
    }
};
