import FeedbackService from "../services/feedback-service.js";

const feedbackService = new FeedbackService();

export const createFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.createFeedback(req.body);
        return res.status(201).json({
            data: feedback,
            message: "Created feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create feedback, error from feedback-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
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
            message: "Unable to create feedback",
            error: error.message,
            success: false
        });
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await feedbackService.getFeedbackById(id);
        return res.status(200).json({
            data: feedback,
            message: "Fetched feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch feedback, error from feedback-controller: ", error);
        if (error.message === "feedback not found") {
            return res.status(404).json({
                data: {},
                message: "Feedback not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch feedback",
            error: error.message,
            success: false
        });
    }
};

export const getFeedbackByBusId = async (req, res) => {
    try {
        const { busId } = req.params;
        const { page, limit } = req.query;

        const feedback = await feedbackService.getFeedbackByBusId(
            busId,
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: feedback,
            message: "Fetched feedback by bus ID successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch feedback by bus ID, error from feedback-controller: ", error);
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
            message: "Unable to fetch feedback by bus ID",
            error: error.message,
            success: false
        });
    }
};

export const getFeedbackByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page, limit } = req.query;

        const feedback = await feedbackService.getFeedbackByUserId(
            userId,
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: feedback,
            message: "Fetched feedback by user ID successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch feedback by user ID, error from feedback-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch feedback by user ID",
            error: error.message,
            success: false
        });
    }
};

export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await feedbackService.updateFeedback(id, req.body);
        return res.status(200).json({
            data: feedback,
            message: "Updated feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update feedback, error from feedback-controller: ", error);
        if (error.message === "feedback not found") {
            return res.status(404).json({
                data: {},
                message: "Feedback not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update feedback",
            error: error.message,
            success: false
        });
    }
};

export const respondToFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminResponse } = req.body;

        if (!adminResponse) {
            return res.status(400).json({
                data: {},
                message: "Admin response is required",
                error: "Missing required parameter",
                success: false
            });
        }

        const feedback = await feedbackService.respondToFeedback(id, adminResponse);
        return res.status(200).json({
            data: feedback,
            message: "Responded to feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to respond to feedback, error from feedback-controller: ", error);
        if (error.message === "feedback not found") {
            return res.status(404).json({
                data: {},
                message: "Feedback not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to respond to feedback",
            error: error.message,
            success: false
        });
    }
};

export const getAverageRating = async (req, res) => {
    try {
        const { busId } = req.params;
        const averageRating = await feedbackService.getAverageRating(busId);
        return res.status(200).json({
            data: { averageRating },
            message: "Fetched average rating successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch average rating, error from feedback-controller: ", error);
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
            message: "Unable to fetch average rating",
            error: error.message,
            success: false
        });
    }
};

export const getFeedbackStats = async (req, res) => {
    try {
        const { busId } = req.params;
        const stats = await feedbackService.getFeedbackStats(busId);
        return res.status(200).json({
            data: stats,
            message: "Fetched feedback stats successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch feedback stats, error from feedback-controller: ", error);
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
            message: "Unable to fetch feedback stats",
            error: error.message,
            success: false
        });
    }
};

export const getPendingFeedback = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const feedback = await feedbackService.getPendingFeedback(
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: feedback,
            message: "Fetched pending feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch pending feedback, error from feedback-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch pending feedback",
            error: error.message,
            success: false
        });
    }
};

export const getAllFeedback = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const feedback = await feedbackService.getAllFeedback(
            parseInt(page) || 1,
            parseInt(limit) || 10
        );

        return res.status(200).json({
            data: feedback,
            message: "Fetched all feedback successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch all feedback, error from feedback-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch all feedback",
            error: error.message,
            success: false
        });
    }
};
