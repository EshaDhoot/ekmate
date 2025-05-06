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

    async getAll() {
        try {
            const buses = await this.busRepository.getAll();
            console.log("getAll method called successfully from BusService to get all buses.");
            return buses;
        } catch (error) {
            console.log("getAll method called from BusService and throws error: ", error);
            throw error;
        }
    }
}

export default BusService;