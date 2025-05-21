import FeedbackRepository from "../repositories/feedback-repository.js";
import UserRepository from "../repositories/user-repository.js";
import BusRepository from "../repositories/bus-repository.js";

class FeedbackService {
    constructor() {
        this.feedbackRepository = new FeedbackRepository();
        this.userRepository = new UserRepository();
        this.busRepository = new BusRepository();
    }

    async createFeedback(payload) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(payload.userId);
            if (!user) {
                throw new Error("user not found");
            }

            // Validate that the bus exists
            const bus = await this.busRepository.findById(payload.busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const feedback = await this.feedbackRepository.create(payload);
            console.log("createFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("createFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getFeedbackById(id) {
        try {
            const feedback = await this.feedbackRepository.findById(id);
            console.log("getFeedbackById method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getFeedbackById method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getFeedbackByBusId(busId, page = 1, limit = 10) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const feedback = await this.feedbackRepository.findByBusId(busId, page, limit);
            console.log("getFeedbackByBusId method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getFeedbackByBusId method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getFeedbackByUserId(userId, page = 1, limit = 10) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const feedback = await this.feedbackRepository.findByUserId(userId, page, limit);
            console.log("getFeedbackByUserId method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getFeedbackByUserId method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async updateFeedback(id, payload) {
        try {
            const feedback = await this.feedbackRepository.update(id, payload);
            console.log("updateFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("updateFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async respondToFeedback(id, adminResponse) {
        try {
            const feedback = await this.feedbackRepository.update(id, {
                adminResponse,
                status: 'resolved'
            });
            console.log("respondToFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("respondToFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getAverageRating(busId) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const averageRating = await this.feedbackRepository.getAverageRating(busId);
            console.log("getAverageRating method called successfully from FeedbackService");
            return averageRating;
        } catch (error) {
            console.log("getAverageRating method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getFeedbackStats(busId) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const stats = await this.feedbackRepository.getFeedbackStats(busId);
            console.log("getFeedbackStats method called successfully from FeedbackService");
            return stats;
        } catch (error) {
            console.log("getFeedbackStats method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getPendingFeedback(page = 1, limit = 10) {
        try {
            const feedback = await this.feedbackRepository.findByStatus('pending', page, limit);
            console.log("getPendingFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getPendingFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getAllFeedback(page = 1, limit = 10) {
        try {
            const feedback = await this.feedbackRepository.findAll(page, limit);
            console.log("getAllFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getAllFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    async getRecentFeedback(limit = 5) {
        try {
            const feedback = await this.feedbackRepository.findRecent(limit);
            console.log("getRecentFeedback method called successfully from FeedbackService");
            return feedback;
        } catch (error) {
            console.log("getRecentFeedback method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }

    // This method is now properly implemented in UserService
    // This is just a wrapper that delegates to UserService
    async getUsersCount() {
        try {
            const UserService = require('./user-service').default;
            const userService = new UserService();
            const count = await userService.getUsersCount();
            console.log("getUsersCount method called successfully from FeedbackService (delegated to UserService)");
            return count;
        } catch (error) {
            console.log("getUsersCount method called from FeedbackService and throws error: ", error);
            throw error;
        }
    }
}

export default FeedbackService;
