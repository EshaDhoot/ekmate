import BusMaintenanceService from "../services/bus-maintenance-service.js";

const busMaintenanceService = new BusMaintenanceService();

export const createMaintenance = async (req, res) => {
    try {
        const maintenance = await busMaintenanceService.createMaintenance(req.body);
        return res.status(201).json({
            data: maintenance,
            message: "Created bus maintenance successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create bus maintenance, error from bus-maintenance-controller: ", error);
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
            message: "Unable to create bus maintenance",
            error: error.message,
            success: false
        });
    }
};

export const getMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await busMaintenanceService.getMaintenanceById(id);
        return res.status(200).json({
            data: maintenance,
            message: "Fetched bus maintenance successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch bus maintenance, error from bus-maintenance-controller: ", error);
        if (error.message === "maintenance record not found") {
            return res.status(404).json({
                data: {},
                message: "Maintenance record not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch bus maintenance",
            error: error.message,
            success: false
        });
    }
};

export const getMaintenanceByBusId = async (req, res) => {
    try {
        const { busId } = req.params;
        const { page, limit } = req.query;
        
        const maintenance = await busMaintenanceService.getMaintenanceByBusId(
            busId, 
            parseInt(page) || 1, 
            parseInt(limit) || 10
        );
        
        return res.status(200).json({
            data: maintenance,
            message: "Fetched maintenance by bus ID successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch maintenance by bus ID, error from bus-maintenance-controller: ", error);
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
            message: "Unable to fetch maintenance by bus ID",
            error: error.message,
            success: false
        });
    }
};

export const getUpcomingMaintenance = async (req, res) => {
    try {
        const { days } = req.query;
        
        const upcomingMaintenance = await busMaintenanceService.getUpcomingMaintenance(
            parseInt(days) || 30
        );
        
        return res.status(200).json({
            data: upcomingMaintenance,
            message: "Fetched upcoming maintenance successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch upcoming maintenance, error from bus-maintenance-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch upcoming maintenance",
            error: error.message,
            success: false
        });
    }
};

export const getMaintenanceHistory = async (req, res) => {
    try {
        const { busId } = req.params;
        
        const maintenanceHistory = await busMaintenanceService.getMaintenanceHistory(busId);
        
        return res.status(200).json({
            data: maintenanceHistory,
            message: "Fetched maintenance history successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch maintenance history, error from bus-maintenance-controller: ", error);
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
            message: "Unable to fetch maintenance history",
            error: error.message,
            success: false
        });
    }
};

export const updateMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await busMaintenanceService.updateMaintenance(id, req.body);
        return res.status(200).json({
            data: maintenance,
            message: "Updated bus maintenance successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update bus maintenance, error from bus-maintenance-controller: ", error);
        if (error.message === "maintenance record not found") {
            return res.status(404).json({
                data: {},
                message: "Maintenance record not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update bus maintenance",
            error: error.message,
            success: false
        });
    }
};

export const updateMaintenanceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({
                data: {},
                message: "Status is required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const maintenance = await busMaintenanceService.updateMaintenanceStatus(id, status);
        return res.status(200).json({
            data: maintenance,
            message: "Updated maintenance status successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update maintenance status, error from bus-maintenance-controller: ", error);
        if (error.message === "maintenance record not found") {
            return res.status(404).json({
                data: {},
                message: "Maintenance record not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update maintenance status",
            error: error.message,
            success: false
        });
    }
};

export const markMaintenanceAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const { completedDate, notes } = req.body;
        
        const maintenance = await busMaintenanceService.markMaintenanceAsCompleted(
            id, 
            completedDate ? new Date(completedDate) : new Date(),
            notes
        );
        
        return res.status(200).json({
            data: maintenance,
            message: "Marked maintenance as completed successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to mark maintenance as completed, error from bus-maintenance-controller: ", error);
        if (error.message === "maintenance record not found") {
            return res.status(404).json({
                data: {},
                message: "Maintenance record not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to mark maintenance as completed",
            error: error.message,
            success: false
        });
    }
};

export const scheduleMaintenance = async (req, res) => {
    try {
        const { busId } = req.params;
        const { maintenanceType, description, scheduledDate } = req.body;
        
        if (!maintenanceType || !description || !scheduledDate) {
            return res.status(400).json({
                data: {},
                message: "Maintenance type, description, and scheduled date are required",
                error: "Missing required parameters",
                success: false
            });
        }
        
        const maintenance = await busMaintenanceService.scheduleMaintenance(
            busId,
            maintenanceType,
            description,
            new Date(scheduledDate)
        );
        
        return res.status(201).json({
            data: maintenance,
            message: "Scheduled maintenance successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to schedule maintenance, error from bus-maintenance-controller: ", error);
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
            message: "Unable to schedule maintenance",
            error: error.message,
            success: false
        });
    }
};
