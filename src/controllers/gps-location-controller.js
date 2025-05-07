import GPSLocationService from "../services/gps-location-service.js";

const gpsLocationService = new GPSLocationService();

export const createLocation = async (req, res) => {
    try {
        const location = await gpsLocationService.createLocation(req.body);
        return res.status(201).json({
            data: location,
            message: "Created a new GPS location successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create a new GPS location, error from gps-location-controller: ", error);
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
            message: "Unable to create a new GPS location",
            error: error.message,
            success: false
        });
    }
};

export const getLatestLocation = async (req, res) => {
    try {
        const { busId } = req.params;
        const location = await gpsLocationService.getLatestLocation(busId);
        return res.status(200).json({
            data: location,
            message: "Fetched latest GPS location successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch latest GPS location, error from gps-location-controller: ", error);
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
            message: "Unable to fetch latest GPS location",
            error: error.message,
            success: false
        });
    }
};

export const getLocationHistory = async (req, res) => {
    try {
        const { busId } = req.params;
        const { startTime, endTime } = req.query;
        
        // Convert string dates to Date objects
        const startDate = startTime ? new Date(startTime) : new Date(Date.now() - 24 * 60 * 60 * 1000); // Default to 24 hours ago
        const endDate = endTime ? new Date(endTime) : new Date(); // Default to now
        
        const locations = await gpsLocationService.getLocationHistory(busId, startDate, endDate);
        return res.status(200).json({
            data: locations,
            message: "Fetched GPS location history successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch GPS location history, error from gps-location-controller: ", error);
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
            message: "Unable to fetch GPS location history",
            error: error.message,
            success: false
        });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await gpsLocationService.updateLocation(id, req.body);
        return res.status(200).json({
            data: location,
            message: "Updated GPS location successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update GPS location, error from gps-location-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to update GPS location",
            error: error.message,
            success: false
        });
    }
};

export const getAllActiveLocations = async (req, res) => {
    try {
        const locations = await gpsLocationService.getAllActiveLocations();
        return res.status(200).json({
            data: locations,
            message: "Fetched all active GPS locations successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch all active GPS locations, error from gps-location-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch all active GPS locations",
            error: error.message,
            success: false
        });
    }
};

export const calculateETA = async (req, res) => {
    try {
        const { busId } = req.params;
        const { destinationLat, destinationLng } = req.query;
        
        if (!destinationLat || !destinationLng) {
            return res.status(400).json({
                data: {},
                message: "Destination latitude and longitude are required",
                error: "Missing required parameters",
                success: false
            });
        }
        
        const eta = await gpsLocationService.calculateETA(
            busId, 
            parseFloat(destinationLat), 
            parseFloat(destinationLng)
        );
        
        return res.status(200).json({
            data: eta,
            message: "Calculated ETA successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to calculate ETA, error from gps-location-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "no active location found for the bus") {
            return res.status(404).json({
                data: {},
                message: "No active location found for the bus",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to calculate ETA",
            error: error.message,
            success: false
        });
    }
};
