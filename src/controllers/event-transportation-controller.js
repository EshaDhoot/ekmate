import EventTransportationService from "../services/event-transportation-service.js";

const eventTransportationService = new EventTransportationService();

export const createEvent = async (req, res) => {
    try {
        // Double-check that the user is an admin (middleware should already handle this)
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                data: {},
                message: "Only administrators can create events",
                error: "Unauthorized access",
                success: false
            });
        }

        const event = await eventTransportationService.createEvent(req.body);
        return res.status(201).json({
            data: event,
            message: "Created event transportation successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create event transportation, error from event-transportation-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to create event transportation",
            error: error.message,
            success: false
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventTransportationService.getEventById(id);
        return res.status(200).json({
            data: event,
            message: "Fetched event transportation successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch event transportation, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch event transportation",
            error: error.message,
            success: false
        });
    }
};



export const getUpcomingEvents = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const events = await eventTransportationService.getUpcomingEvents(
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: events,
            message: "Fetched upcoming events successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch upcoming events, error from event-transportation-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch upcoming events",
            error: error.message,
            success: false
        });
    }
};

export const getPendingEvents = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const events = await eventTransportationService.getPendingEvents(
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: events,
            message: "Fetched pending events successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch pending events, error from event-transportation-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch pending events",
            error: error.message,
            success: false
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventTransportationService.updateEvent(id, req.body);
        return res.status(200).json({
            data: event,
            message: "Updated event transportation successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update event transportation, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update event transportation",
            error: error.message,
            success: false
        });
    }
};

export const assignBusToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const busAssignment = req.body;

        if (!busAssignment.busId) {
            return res.status(400).json({
                data: {},
                message: "Bus ID is required",
                error: "Missing required parameter",
                success: false
            });
        }

        const event = await eventTransportationService.assignBusToEvent(id, busAssignment);
        return res.status(200).json({
            data: event,
            message: "Assigned bus to event successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to assign bus to event, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
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
            message: "Unable to assign bus to event",
            error: error.message,
            success: false
        });
    }
};

export const updateEventStatus = async (req, res) => {
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

        const event = await eventTransportationService.updateEventStatus(id, status);
        return res.status(200).json({
            data: event,
            message: "Updated event status successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update event status, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update event status",
            error: error.message,
            success: false
        });
    }
};

export const approveEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventTransportationService.approveEvent(id);
        return res.status(200).json({
            data: event,
            message: "Approved event successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to approve event, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to approve event",
            error: error.message,
            success: false
        });
    }
};

export const cancelEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventTransportationService.cancelEvent(id);
        return res.status(200).json({
            data: event,
            message: "Cancelled event successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to cancel event, error from event-transportation-controller: ", error);
        if (error.message === "event transportation not found") {
            return res.status(404).json({
                data: {},
                message: "Event transportation not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to cancel event",
            error: error.message,
            success: false
        });
    }
};
