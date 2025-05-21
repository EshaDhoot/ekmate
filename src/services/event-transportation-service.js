import EventTransportationRepository from "../repositories/event-transportation-repository.js";
import UserRepository from "../repositories/user-repository.js";
import BusRepository from "../repositories/bus-repository.js";
import DriverRepository from "../repositories/driver-repository.js";

class EventTransportationService {
    constructor() {
        this.eventTransportationRepository = new EventTransportationRepository();
        this.userRepository = new UserRepository();
        this.busRepository = new BusRepository();
        this.driverRepository = new DriverRepository();
    }

    async createEvent(payload) {
        try {
            const event = await this.eventTransportationRepository.create(payload);
            console.log("createEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("createEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async getEventById(id) {
        try {
            const event = await this.eventTransportationRepository.findById(id);
            console.log("getEventById method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("getEventById method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }



    async getUpcomingEvents(page = 1, limit = 10) {
        try {
            const events = await this.eventTransportationRepository.findUpcomingEvents(page, limit);
            console.log("getUpcomingEvents method called successfully from EventTransportationService");
            return events;
        } catch (error) {
            console.log("getUpcomingEvents method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async getPendingEvents(page = 1, limit = 10) {
        try {
            const events = await this.eventTransportationRepository.findByStatus('pending', page, limit);
            console.log("getPendingEvents method called successfully from EventTransportationService");
            return events;
        } catch (error) {
            console.log("getPendingEvents method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async updateEvent(id, payload) {
        try {
            const event = await this.eventTransportationRepository.update(id, payload);
            console.log("updateEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("updateEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async assignBusToEvent(id, busAssignment) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busAssignment.busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            // Validate that the driver exists if provided
            if (busAssignment.driver) {
                const driver = await this.driverRepository.findById(busAssignment.driver);
                if (!driver) {
                    throw new Error("driver not found");
                }
            }

            const event = await this.eventTransportationRepository.assignBus(id, busAssignment);
            console.log("assignBusToEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("assignBusToEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async updateEventStatus(id, status) {
        try {
            const event = await this.eventTransportationRepository.updateStatus(id, status);
            console.log("updateEventStatus method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("updateEventStatus method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async approveEvent(id) {
        try {
            const event = await this.eventTransportationRepository.updateStatus(id, 'approved');
            console.log("approveEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("approveEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async cancelEvent(id) {
        try {
            const event = await this.eventTransportationRepository.updateStatus(id, 'cancelled');
            console.log("cancelEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("cancelEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async completeEvent(id) {
        try {
            const event = await this.eventTransportationRepository.updateStatus(id, 'completed');
            console.log("completeEvent method called successfully from EventTransportationService");
            return event;
        } catch (error) {
            console.log("completeEvent method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async getRecentEvents(limit = 5) {
        try {
            const events = await this.eventTransportationRepository.findRecent(limit);
            console.log("getRecentEvents method called successfully from EventTransportationService");
            return events;
        } catch (error) {
            console.log("getRecentEvents method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }

    async getAllEvents(page = 1, limit = 10, query = {}) {
        try {
            const events = await this.eventTransportationRepository.findAll(page, limit, query);
            console.log("getAllEvents method called successfully from EventTransportationService");
            return events;
        } catch (error) {
            console.log("getAllEvents method called from EventTransportationService and throws error: ", error);
            throw error;
        }
    }
}

export default EventTransportationService;
