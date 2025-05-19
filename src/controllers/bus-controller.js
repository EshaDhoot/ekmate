import BusService from "../services/bus-service.js";

const busService = new BusService();

export const createBus = async (req, res) => {
    try {
        const bus = await busService.create(req.body);
        return res.status(201).json({
            data: bus,
            message: "created a new bus successfully",
            error: {},
            success: true
        })
    } catch (error) {
        console.log("unable to create a new bus, error from bus-controller: ", error);
        if (error.message === "bus already exists") {
            return res.status(409).json({
                data: {},
                message: "bus already exists",
                error: error.errmsg,
                success: false
            })
        }
        return res.status(500).json({
            data: {},
            message: "unable to create a new bus",
            error: error,
            success: false
        })
    }
}

export const getBus = async (req, res) => {
    try {
        const { route, busNumber } = req.query;

        // Build filter object based on query parameters
        let filter = {};

        // If both route and busNumber are provided, use $or to search in either field
        if (route && busNumber && route === busNumber) {
            // If they're the same value, user is likely searching for either
            filter = {
                $or: [
                    { title: { $regex: route, $options: 'i' } },
                    { busNumber: { $regex: busNumber, $options: 'i' } },
                    { 'routes.pickupPoint': { $regex: route, $options: 'i' } }
                ]
            };
        } else {
            // Handle individual filters
            if (route) {
                filter.title = { $regex: route, $options: 'i' }; // Case-insensitive search
            }

            if (busNumber) {
                filter.busNumber = { $regex: busNumber, $options: 'i' }; // Case-insensitive search
            }
        }

        const buses = await busService.getAll(filter);
        return res.status(200).json({
            data: buses,
            message: "fetched all buses successfully",
            error: {},
            success: true
        })
    } catch (error) {
        console.log("unable to fetch all buses, error from bus-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "unable to fetch all buses",
            error: error,
            success: false
        })
    }
}

export const getBusById = async (req, res) => {
    try {
        const bus = await busService.getById(req.params.id);
        return res.status(200).json({
            data: bus,
            message: "fetched bus successfully",
            error: {},
            success: true
        })
    } catch (error) {
        console.log("unable to fetch bus, error from bus-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "bus not found",
                error: error.message,
                success: false
            })
        }
        return res.status(500).json({
            data: {},
            message: "unable to fetch bus",
            error: error.message,
            success: false
        })
    }
}

export const updateBus = async (req, res) => {
    try {
        const bus = await busService.update(req.params.id, req.body);
        return res.status(200).json({
            data: bus,
            message: "updated bus successfully",
            error: {},
            success: true
        })
    } catch (error) {
        console.log("unable to update bus, error from bus-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "bus not found",
                error: error.message,
                success: false
            })
        }
        return res.status(500).json({
            data: {},
            message: "unable to update bus",
            error: error.message,
            success: false
        })
    }
}

export const deleteBus = async (req, res) => {
    try {
        await busService.delete(req.params.id);
        return res.status(200).json({
            data: {},
            message: "deleted bus successfully",
            error: {},
            success: true
        })
    } catch (error) {
        console.log("unable to delete bus, error from bus-controller: ", error);
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "bus not found",
                error: error.message,
                success: false
            })
        }
        return res.status(500).json({
            data: {},
            message: "unable to delete bus",
            error: error.message,
            success: false
        })
    }
}