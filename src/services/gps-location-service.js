import GPSLocationRepository from "../repositories/gps-location-repository.js";
import BusRepository from "../repositories/bus-repository.js";

class GPSLocationService {
    constructor() {
        this.gpsLocationRepository = new GPSLocationRepository();
        this.busRepository = new BusRepository();
    }

    async createLocation(payload) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(payload.busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const location = await this.gpsLocationRepository.create(payload);
            
            // Update the current location in the bus model as well
            await this.busRepository.updateLocation(payload.busId, {
                currentLocation: {
                    latitude: payload.latitude,
                    longitude: payload.longitude,
                    lastUpdated: new Date()
                }
            });
            
            console.log("createLocation method called successfully from GPSLocationService");
            return location;
        } catch (error) {
            console.log("createLocation method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }

    async getLatestLocation(busId) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const location = await this.gpsLocationRepository.getLatestLocation(busId);
            console.log("getLatestLocation method called successfully from GPSLocationService");
            return location;
        } catch (error) {
            console.log("getLatestLocation method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }

    async getLocationHistory(busId, startTime, endTime) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const locations = await this.gpsLocationRepository.getLocationHistory(busId, startTime, endTime);
            console.log("getLocationHistory method called successfully from GPSLocationService");
            return locations;
        } catch (error) {
            console.log("getLocationHistory method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }

    async updateLocation(id, payload) {
        try {
            const location = await this.gpsLocationRepository.updateLocation(id, payload);
            
            // If the location has a busId, update the bus's current location as well
            if (location && location.busId) {
                await this.busRepository.updateLocation(location.busId, {
                    currentLocation: {
                        latitude: payload.latitude || location.latitude,
                        longitude: payload.longitude || location.longitude,
                        lastUpdated: new Date()
                    }
                });
            }
            
            console.log("updateLocation method called successfully from GPSLocationService");
            return location;
        } catch (error) {
            console.log("updateLocation method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }

    async getAllActiveLocations() {
        try {
            const locations = await this.gpsLocationRepository.getActiveLocations();
            console.log("getAllActiveLocations method called successfully from GPSLocationService");
            return locations;
        } catch (error) {
            console.log("getAllActiveLocations method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }

    // Calculate ETA based on current location and traffic conditions
    async calculateETA(busId, destinationLat, destinationLng) {
        try {
            const latestLocation = await this.gpsLocationRepository.getLatestLocation(busId);
            if (!latestLocation) {
                throw new Error("no active location found for the bus");
            }
            
            // In a real implementation, you would use a mapping service API like Google Maps
            // to calculate the ETA based on current traffic conditions
            // This is a simplified placeholder implementation
            
            // Calculate distance using Haversine formula (distance between two points on a sphere)
            const R = 6371; // Radius of the Earth in km
            const dLat = this._toRad(destinationLat - latestLocation.latitude);
            const dLon = this._toRad(destinationLng - latestLocation.longitude);
            const lat1 = this._toRad(latestLocation.latitude);
            const lat2 = this._toRad(destinationLat);
            
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            const distance = R * c; // Distance in km
            
            // Assume average speed of 30 km/h in traffic
            const averageSpeed = 30;
            const estimatedTimeInHours = distance / averageSpeed;
            const estimatedTimeInMinutes = Math.round(estimatedTimeInHours * 60);
            
            console.log("calculateETA method called successfully from GPSLocationService");
            return {
                distance: distance.toFixed(2),
                estimatedTimeInMinutes,
                unit: 'km'
            };
        } catch (error) {
            console.log("calculateETA method called from GPSLocationService and throws error: ", error);
            throw error;
        }
    }
    
    // Helper method to convert degrees to radians
    _toRad(degrees) {
        return degrees * Math.PI / 180;
    }
}

export default GPSLocationService;
