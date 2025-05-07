import Bus from "../models/bus-model.js";

class BusRepository {
    async create(payload) {
        try {
            const bus = await Bus.create(payload);
            console.log("New bus created successfully, create method called successfully from BusRepository");
            return bus;
        } catch (error) {
            if (error.code === 11000) {
                console.log("Bus already exists, create method called from BusRepository and throws error: ", error);
                throw new Error("bus already exists");
            }
            console.log("Unable to create a new bus, create method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async getAll(filter = {}, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const buses = await Bus.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('driver', 'name phone_number');

            const total = await Bus.countDocuments(filter);

            console.log("getAll method called successfully from BusRepository to get all buses.");
            return {
                buses,
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.log("getAll method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const bus = await Bus.findById(id).populate('driver', 'name phone_number');
            if (!bus) {
                console.log("No bus found with the given ID.");
                throw new Error("bus not found");
            }
            console.log("findById method called successfully from BusRepository to find a bus by ID.");
            return bus;
        } catch (error) {
            console.log("findById method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const bus = await Bus.findByIdAndUpdate(id, payload, { new: true });
            if (!bus) {
                console.log("No bus found with the given ID.");
                throw new Error("bus not found");
            }
            console.log("update method called successfully from BusRepository to update a bus.");
            return bus;
        } catch (error) {
            console.log("update method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const bus = await Bus.findByIdAndDelete(id);
            if (!bus) {
                console.log("No bus found with the given ID.");
                throw new Error("bus not found");
            }
            console.log("delete method called successfully from BusRepository to delete a bus.");
            return true;
        } catch (error) {
            console.log("delete method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async updateLocation(id, locationData) {
        try {
            const bus = await Bus.findByIdAndUpdate(
                id,
                { currentLocation: locationData },
                { new: true }
            );

            if (!bus) {
                console.log("No bus found with the given ID.");
                throw new Error("bus not found");
            }

            console.log("updateLocation method called successfully from BusRepository to update a bus location.");
            return bus;
        } catch (error) {
            console.log("updateLocation method called from BusRepository and throws error: ", error);
            throw error;
        }
    }

    async findByBusNumber(busNumber) {
        try {
            const bus = await Bus.findOne({ busNumber });
            if (!bus) {
                console.log("No bus found with the given bus number.");
                throw new Error("bus not found");
            }
            console.log("findByBusNumber method called successfully from BusRepository to find a bus by bus number.");
            return bus;
        } catch (error) {
            console.log("findByBusNumber method called from BusRepository and throws error: ", error);
            throw error;
        }
    }
}

export default BusRepository;