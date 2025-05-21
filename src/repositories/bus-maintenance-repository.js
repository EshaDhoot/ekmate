import BusMaintenance from "../models/bus-maintenance-model.js";

class BusMaintenanceRepository {
    async create(payload) {
        try {
            const maintenance = await BusMaintenance.create(payload);
            console.log("New bus maintenance created successfully, create method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to create bus maintenance, create method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const maintenance = await BusMaintenance.findById(id).populate('busId', 'title busNumber');
            if (!maintenance) {
                console.log("No maintenance record found with the given ID.");
                throw new Error("maintenance record not found");
            }
            console.log("Maintenance record found successfully, findById method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to find maintenance record, findById method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async findByBusId(busId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const maintenanceRecords = await BusMaintenance.find({ busId })
                .sort({ scheduledDate: -1 })
                .skip(skip)
                .limit(limit);

            const total = await BusMaintenance.countDocuments({ busId });

            console.log("Maintenance records found successfully, findByBusId method called successfully from BusMaintenanceRepository");
            return { maintenanceRecords, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find maintenance records, findByBusId method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async getUpcomingMaintenance(page = 1, limit = 10) {
        try {
            const today = new Date();
            const skip = (page - 1) * limit;

            // Find maintenance records with scheduled date in the future and status not completed
            const maintenanceRecords = await BusMaintenance.find({
                scheduledDate: { $gte: today },
                status: { $ne: 'completed' }
            })
                .populate('busId', 'title busNumber')
                .sort({ scheduledDate: 1 })
                .skip(skip)
                .limit(limit);

            const total = await BusMaintenance.countDocuments({
                scheduledDate: { $gte: today },
                status: { $ne: 'completed' }
            });

            console.log("Upcoming maintenance found successfully, getUpcomingMaintenance method called successfully from BusMaintenanceRepository");
            return { maintenanceRecords, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find upcoming maintenance, getUpcomingMaintenance method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async getMaintenanceHistory(busId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            // Find all maintenance records for the given bus
            const maintenanceRecords = await BusMaintenance.find({ busId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await BusMaintenance.countDocuments({ busId });

            console.log("Maintenance history found successfully, getMaintenanceHistory method called successfully from BusMaintenanceRepository");
            return { maintenanceRecords, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find maintenance history, getMaintenanceHistory method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const maintenance = await BusMaintenance.findByIdAndUpdate(id, payload, { new: true });
            if (!maintenance) {
                console.log("No maintenance record found with the given ID.");
                throw new Error("maintenance record not found");
            }
            console.log("Maintenance record updated successfully, update method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to update maintenance record, update method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            const maintenance = await BusMaintenance.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            if (!maintenance) {
                console.log("No maintenance record found with the given ID.");
                throw new Error("maintenance record not found");
            }

            console.log("Status updated successfully, updateStatus method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to update status, updateStatus method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async markAsCompleted(id, completedDate, notes) {
        try {
            const maintenance = await BusMaintenance.findByIdAndUpdate(
                id,
                {
                    status: 'completed',
                    completedDate,
                    notes: notes || ''
                },
                { new: true }
            );

            if (!maintenance) {
                console.log("No maintenance record found with the given ID.");
                throw new Error("maintenance record not found");
            }

            console.log("Maintenance marked as completed successfully, markAsCompleted method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to mark maintenance as completed, markAsCompleted method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async findRecent(limit = 5) {
        try {
            const maintenance = await BusMaintenance.find()
                .populate('busId', 'title busNumber')
                .sort({ createdAt: -1 })
                .limit(limit);

            console.log("Recent maintenance found successfully, findRecent method called successfully from BusMaintenanceRepository");
            return maintenance;
        } catch (error) {
            console.log("Unable to find recent maintenance, findRecent method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10, query = {}) {
        try {
            const skip = (page - 1) * limit;

            // Build the query
            const searchQuery = {};

            // Add status filter if provided
            if (query.status) {
                searchQuery.status = query.status;
            }

            // Add busId filter if provided
            if (query.busId) {
                searchQuery.busId = query.busId;
            }

            // Execute the query with pagination
            const maintenanceRecords = await BusMaintenance.find(searchQuery)
                .populate('busId', 'title busNumber')
                .sort({ scheduledDate: -1 })
                .skip(skip)
                .limit(limit);

            const total = await BusMaintenance.countDocuments(searchQuery);

            console.log("All maintenance records found successfully, findAll method called successfully from BusMaintenanceRepository");
            return {
                maintenanceRecords,
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.log("Unable to find all maintenance records, findAll method called from BusMaintenanceRepository and throws error: ", error);
            throw error;
        }
    }
}

export default BusMaintenanceRepository;
