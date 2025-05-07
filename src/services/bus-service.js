import BusRepository from "../repositories/bus-repository.js";

class BusService {
    constructor() {
        this.busRepository = new BusRepository();
    }

    async create(payload) {
        try {
            const bus = await this.busRepository.create(payload);
            console.log("create method called successfully from BusService to create a new bus.");
            return bus;
        } catch (error) {
            console.log("create method called from BusService and throws error: ", error);
            if (error.message === "bus already exists") {
                throw new Error("bus already exists");
            }
            throw error;
        }
    }

    async getAll(filter = {}, page = 1, limit = 10) {
        try {
            const buses = await this.busRepository.getAll(filter, page, limit);
            console.log("getAll method called successfully from BusService to get all buses.");
            return buses;
        } catch (error) {
            console.log("getAll method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const bus = await this.busRepository.findById(id);
            console.log("getById method called successfully from BusService to get a bus by ID.");
            return bus;
        } catch (error) {
            console.log("getById method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const bus = await this.busRepository.update(id, payload);
            console.log("update method called successfully from BusService to update a bus.");
            return bus;
        } catch (error) {
            console.log("update method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.busRepository.delete(id);
            console.log("delete method called successfully from BusService to delete a bus.");
            return true;
        } catch (error) {
            console.log("delete method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async updateLocation(id, locationData) {
        try {
            const bus = await this.busRepository.updateLocation(id, locationData);
            console.log("updateLocation method called successfully from BusService to update a bus location.");
            return bus;
        } catch (error) {
            console.log("updateLocation method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async getAccessibleBuses() {
        try {
            const buses = await this.busRepository.getAll({ "features.wheelchairAccessible": true });
            console.log("getAccessibleBuses method called successfully from BusService to get accessible buses.");
            return buses;
        } catch (error) {
            console.log("getAccessibleBuses method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async getActiveBuses() {
        try {
            const buses = await this.busRepository.getAll({ status: 'active' });
            console.log("getActiveBuses method called successfully from BusService to get active buses.");
            return buses;
        } catch (error) {
            console.log("getActiveBuses method called from BusService and throws error: ", error);
            throw error;
        }
    }

    async getBusesByStatus(status) {
        try {
            const buses = await this.busRepository.getAll({ status });
            console.log("getBusesByStatus method called successfully from BusService to get buses by status.");
            return buses;
        } catch (error) {
            console.log("getBusesByStatus method called from BusService and throws error: ", error);
            throw error;
        }
    }
}

export default BusService;