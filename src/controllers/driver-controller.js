import DriverService from "../services/driver-service.js";

const driverService = new DriverService();

export const createDriver = async (req, res) => {
    try {
        const driver = await driverService.create(req.body);
        return res.status(201).json({
            data: driver,
            message: "Created a new driver successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create a new driver, error from driver-controller: ", error);
        if (error.message === "driver already exists") {
            return res.status(409).json({
                data: {},
                message: "Driver already exists",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to create a new driver",
            error: error.message,
            success: false
        });
    }
};

export const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await driverService.getDriverById(id);
        return res.status(200).json({
            data: driver,
            message: "Fetched driver successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch driver, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch driver",
            error: error.message,
            success: false
        });
    }
};

export const getAllDrivers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        
        const drivers = await driverService.getAllDrivers(
            parseInt(page) || 1, 
            parseInt(limit) || 10
        );
        
        return res.status(200).json({
            data: drivers,
            message: "Fetched all drivers successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch all drivers, error from driver-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch all drivers",
            error: error.message,
            success: false
        });
    }
};

export const getActiveDrivers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        
        const drivers = await driverService.getActiveDrivers(
            parseInt(page) || 1, 
            parseInt(limit) || 10
        );
        
        return res.status(200).json({
            data: drivers,
            message: "Fetched active drivers successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch active drivers, error from driver-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch active drivers",
            error: error.message,
            success: false
        });
    }
};

export const getDriversWithExpiringLicenses = async (req, res) => {
    try {
        const { days } = req.query;
        
        const drivers = await driverService.getDriversWithExpiringLicenses(
            parseInt(days) || 30
        );
        
        return res.status(200).json({
            data: drivers,
            message: "Fetched drivers with expiring licenses successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch drivers with expiring licenses, error from driver-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch drivers with expiring licenses",
            error: error.message,
            success: false
        });
    }
};

export const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await driverService.updateDriver(id, req.body);
        return res.status(200).json({
            data: driver,
            message: "Updated driver successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update driver, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "driver already exists") {
            return res.status(409).json({
                data: {},
                message: "Driver with the updated details already exists",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update driver",
            error: error.message,
            success: false
        });
    }
};

export const assignBus = async (req, res) => {
    try {
        const { id } = req.params;
        const { busId } = req.body;
        
        if (!busId) {
            return res.status(400).json({
                data: {},
                message: "Bus ID is required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const driver = await driverService.assignBus(id, busId);
        return res.status(200).json({
            data: driver,
            message: "Assigned bus to driver successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to assign bus to driver, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
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
            message: "Unable to assign bus to driver",
            error: error.message,
            success: false
        });
    }
};

export const sendOTP = async (req, res) => {
    try {
        await driverService.sendOTP(req.body);
        return res.status(200).json({
            data: {},
            message: "Sent OTP successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to send OTP, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to send OTP",
            error: error.message,
            success: false
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        await driverService.verifyOTP(req.body);
        return res.status(200).json({
            data: {},
            message: "Verified OTP successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to verify OTP, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "Invalid OTP") {
            return res.status(400).json({
                data: {},
                message: "Invalid OTP",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to verify OTP",
            error: error.message,
            success: false
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const token = await driverService.signIn(req.body);
        return res.status(200).json({
            data: token,
            message: "Signed in successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to sign in, error from driver-controller: ", error);
        if (error.message === "driver not found") {
            return res.status(404).json({
                data: {},
                message: "Driver not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "Incorrect Password") {
            return res.status(401).json({
                data: {},
                message: "Incorrect password",
                error: error.message,
                success: false
            });
        }
        if (error.message === "Email not verified") {
            return res.status(401).json({
                data: {},
                message: "Email not verified",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to sign in",
            error: error.message,
            success: false
        });
    }
};
