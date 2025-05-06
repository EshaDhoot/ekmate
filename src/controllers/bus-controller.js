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
        const buses = await busService.getAll();
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