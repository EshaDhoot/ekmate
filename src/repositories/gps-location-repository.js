import GPSLocation from "../models/gps-location-model.js";

class GPSLocationRepository {
    async create(payload) {
        try {
            const location = await GPSLocation.create(payload);
            console.log("New GPS location created successfully, create method called successfully from GPSLocationRepository");
            return location;
        } catch (error) {
            console.log("Unable to create a new GPS location, create method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }

    async getLatestLocation(busId) {
        try {
            const location = await GPSLocation.getLatestLocation(busId);
            console.log("getLatestLocation method called successfully from GPSLocationRepository");
            return location;
        } catch (error) {
            console.log("getLatestLocation method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }

    async getLocationHistory(busId, startTime, endTime) {
        try {
            const locations = await GPSLocation.getLocationHistory(busId, startTime, endTime);
            console.log("getLocationHistory method called successfully from GPSLocationRepository");
            return locations;
        } catch (error) {
            console.log("getLocationHistory method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }

    async updateLocation(id, payload) {
        try {
            const location = await GPSLocation.findByIdAndUpdate(id, payload, { new: true });
            console.log("updateLocation method called successfully from GPSLocationRepository");
            return location;
        } catch (error) {
            console.log("updateLocation method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }

    async deleteLocation(id) {
        try {
            await GPSLocation.findByIdAndDelete(id);
            console.log("deleteLocation method called successfully from GPSLocationRepository");
            return true;
        } catch (error) {
            console.log("deleteLocation method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }

    async getActiveLocations() {
        try {
            const locations = await GPSLocation.find({ isActive: true }).sort({ timestamp: -1 });
            console.log("getActiveLocations method called successfully from GPSLocationRepository");
            return locations;
        } catch (error) {
            console.log("getActiveLocations method called from GPSLocationRepository and throws error: ", error);
            throw error;
        }
    }
}

export default GPSLocationRepository;
