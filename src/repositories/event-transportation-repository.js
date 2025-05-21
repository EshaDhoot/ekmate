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



    async findUpcomingEvents(page = 1, limit = 10) {
        try {
            const today = new Date();
            const skip = (page - 1) * limit;

            const events = await EventTransportation.find({ startDate: { $gte: today } })
                .sort({ startDate: 1 })
                .skip(skip)
                .limit(limit);

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
                .limit(limit);

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

    async findRecent(limit = 5) {
        try {
            const events = await EventTransportation.find()
                .sort({ createdAt: -1 })
                .limit(limit);

            console.log("Recent events found successfully, findRecent method called successfully from EventTransportationRepository");
            return events;
        } catch (error) {
            console.log("Unable to find recent events, findRecent method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10, query = {}) {
        try {
            const skip = (page - 1) * limit;

            // Build the query
            const searchQuery = {};

            // Add search criteria if provided
            if (query.search) {
                searchQuery.$or = [
                    { eventName: { $regex: query.search, $options: 'i' } },
                    { description: { $regex: query.search, $options: 'i' } }
                ];
            }

            // Add status filter if provided
            if (query.status) {
                searchQuery.status = query.status;
            }

            // Execute the query with pagination
            const events = await EventTransportation.find(searchQuery)
                .populate('assignedBuses.busId', 'title busNumber')
                .populate('assignedBuses.driver', 'name phone_number')
                .sort({ startDate: -1 })
                .skip(skip)
                .limit(limit);

            const total = await EventTransportation.countDocuments(searchQuery);

            console.log("All events found successfully, findAll method called successfully from EventTransportationRepository");
            return {
                events,
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.log("Unable to find all events, findAll method called from EventTransportationRepository and throws error: ", error);
            throw error;
        }
    }
}

export default EventTransportationRepository;
