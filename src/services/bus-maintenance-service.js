import BusMaintenanceRepository from "../repositories/bus-maintenance-repository.js";
import BusRepository from "../repositories/bus-repository.js";

class BusMaintenanceService {
    constructor() {
        this.busMaintenanceRepository = new BusMaintenanceRepository();
        this.busRepository = new BusRepository();
    }

    async createMaintenance(payload) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(payload.busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const maintenance = await this.busMaintenanceRepository.create(payload);
            
            // Update the bus's status and next maintenance date
            await this.busRepository.update(payload.busId, {
                status: payload.maintenanceType === 'emergency' ? 'maintenance' : bus.status,
                nextMaintenance: payload.scheduledDate
            });
            
            console.log("createMaintenance method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("createMaintenance method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async getMaintenanceById(id) {
        try {
            const maintenance = await this.busMaintenanceRepository.findById(id);
            console.log("getMaintenanceById method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("getMaintenanceById method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async getMaintenanceByBusId(busId, page = 1, limit = 10) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const maintenance = await this.busMaintenanceRepository.findByBusId(busId, page, limit);
            console.log("getMaintenanceByBusId method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("getMaintenanceByBusId method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async getUpcomingMaintenance(days = 30) {
        try {
            const upcomingMaintenance = await this.busMaintenanceRepository.getUpcomingMaintenance(days);
            console.log("getUpcomingMaintenance method called successfully from BusMaintenanceService");
            return upcomingMaintenance;
        } catch (error) {
            console.log("getUpcomingMaintenance method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async getMaintenanceHistory(busId) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const maintenanceHistory = await this.busMaintenanceRepository.getMaintenanceHistory(busId);
            console.log("getMaintenanceHistory method called successfully from BusMaintenanceService");
            return maintenanceHistory;
        } catch (error) {
            console.log("getMaintenanceHistory method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async updateMaintenance(id, payload) {
        try {
            const maintenance = await this.busMaintenanceRepository.update(id, payload);
            console.log("updateMaintenance method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("updateMaintenance method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async updateMaintenanceStatus(id, status) {
        try {
            const maintenance = await this.busMaintenanceRepository.updateStatus(id, status);
            
            // If the status is completed, update the bus's status and last maintenance date
            if (status === 'completed') {
                const bus = await this.busRepository.findById(maintenance.busId);
                if (bus) {
                    await this.busRepository.update(maintenance.busId, {
                        status: 'active',
                        lastMaintenance: new Date()
                    });
                }
            }
            
            console.log("updateMaintenanceStatus method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("updateMaintenanceStatus method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async markMaintenanceAsCompleted(id, completedDate, notes) {
        try {
            const maintenance = await this.busMaintenanceRepository.markAsCompleted(id, completedDate, notes);
            
            // Update the bus's status and last maintenance date
            const bus = await this.busRepository.findById(maintenance.busId);
            if (bus) {
                await this.busRepository.update(maintenance.busId, {
                    status: 'active',
                    lastMaintenance: completedDate || new Date()
                });
            }
            
            console.log("markMaintenanceAsCompleted method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("markMaintenanceAsCompleted method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }

    async scheduleMaintenance(busId, maintenanceType, description, scheduledDate) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const maintenance = await this.busMaintenanceRepository.create({
                busId,
                maintenanceType,
                description,
                scheduledDate,
                status: 'scheduled'
            });
            
            // Update the bus's next maintenance date
            await this.busRepository.update(busId, {
                nextMaintenance: scheduledDate
            });
            
            console.log("scheduleMaintenance method called successfully from BusMaintenanceService");
            return maintenance;
        } catch (error) {
            console.log("scheduleMaintenance method called from BusMaintenanceService and throws error: ", error);
            throw error;
        }
    }
}

export default BusMaintenanceService;
