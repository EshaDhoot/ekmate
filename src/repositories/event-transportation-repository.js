import EventTransportation from "../models/event-transportation-model.js";

class EventTransportationRepository {
    async create(payload) {
        try {
            const event = await EventTransportation.create(payload);
            console.log("New event transportation created successfully, create method called successfully from EventTransportationRepository");
            return event;
        } catch (error) {
            console.log("Unable to create event transportation, create method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const event = await EventTransportation.findById(id)
                .populate('organizer', 'name email')
                .populate('assignedBuses.busId', 'title busNumber')
                .populate('assignedBuses.driver', 'name phone_number');
                
            if (!event) {
                console.log("No event transportation found with the given ID.");
                throw new Error("event transportation not found");
            }
            console.log("Event transportation found successfully, findById method called successfully from EventTransportationRepository");
            return event;
        } catch (error) {
            console.log("Unable to find event transportation, findById method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async findByOrganizer(organizerId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const events = await EventTransportation.find({ organizer: organizerId })
                .sort({ startDate: -1 })
                .skip(skip)
                .limit(limit)
                .populate('organizer', 'name email');
            
            const total = await EventTransportation.countDocuments({ organizer: organizerId });
            
            console.log("Event transportation found successfully, findByOrganizer method called successfully from EventTransportationRepository");
            return { events, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find event transportation, findByOrganizer method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async findUpcomingEvents(page = 1, limit = 10) {
        try {
            const today = new Date();
            const skip = (page - 1) * limit;
            
            const events = await EventTransportation.find({ startDate: { $gte: today } })
                .sort({ startDate: 1 })
                .skip(skip)
                .limit(limit)
                .populate('organizer', 'name email');
            
            const total = await EventTransportation.countDocuments({ startDate: { $gte: today } });
            
            console.log("Upcoming events found successfully, findUpcomingEvents method called successfully from EventTransportationRepository");
            return { events, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find upcoming events, findUpcomingEvents method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async findByStatus(status, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            
            const events = await EventTransportation.find({ status })
                .sort({ startDate: 1 })
                .skip(skip)
                .limit(limit)
                .populate('organizer', 'name email');
            
            const total = await EventTransportation.countDocuments({ status });
            
            console.log("Events found successfully, findByStatus method called successfully from EventTransportationRepository");
            return { events, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find events, findByStatus method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const event = await EventTransportation.findByIdAndUpdate(id, payload, { new: true });
            if (!event) {
                console.log("No event transportation found with the given ID.");
                throw new Error("event transportation not found");
            }
            console.log("Event transportation updated successfully, update method called successfully from EventTransportationRepository");
            return event;
        } catch (error) {
            console.log("Unable to update event transportation, update method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async assignBus(id, busAssignment) {
        try {
            const event = await EventTransportation.findByIdAndUpdate(
                id,
                { $push: { assignedBuses: busAssignment } },
                { new: true }
            );
            
            if (!event) {
                console.log("No event transportation found with the given ID.");
                throw new Error("event transportation not found");
            }
            
            console.log("Bus assigned successfully, assignBus method called successfully from EventTransportationRepository");
            return event;
        } catch (error) {
            console.log("Unable to assign bus, assignBus method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            const event = await EventTransportation.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            
            if (!event) {
                console.log("No event transportation found with the given ID.");
                throw new Error("event transportation not found");
            }
            
            console.log("Status updated successfully, updateStatus method called successfully from EventTransportationRepository");
            return event;
        } catch (error) {
            console.log("Unable to update status, updateStatus method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }
}

export default EventTransportationRepository;
