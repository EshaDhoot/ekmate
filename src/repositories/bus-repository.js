import Bus from "../models/bus-model.js";

class BusRepository {
    async create(payload) {
        try {
            const bus = await Bus.create(payload);
            console.log("new bus created successfully, create method called successfully from BusRepository");
            return bus;
        } catch (error) {
            if (error.code === 11000) {
                console.log("bus already exists, create method called from BusRepository and throws error: ", error);
                throw new Error("bus already exists");
            }
            console.log("unable to create a new bus, create method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const buses = await Bus.find();
            console.log("getAll method called successfully from BusRepository to get all buses.");
            return buses;
        } catch (error) {
            console.log("getAll method called from BusRepository and throws error: ", error);
            throw error;
        }
    }
    
}

export default BusRepository;