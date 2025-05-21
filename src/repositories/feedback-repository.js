import Feedback from "../models/feedback-model.js";

class FeedbackRepository {
    async create(payload) {
        try {
            const feedback = await Feedback.create(payload);
            console.log("New feedback created successfully, create method called successfully from FeedbackRepository");
            return feedback;
        } catch (error) {
            console.log("Unable to create feedback, create method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const feedback = await Feedback.findById(id);
            if (!feedback) {
                console.log("No feedback found with the given ID.");
                throw new Error("feedback not found");
            }
            console.log("Feedback found successfully, findById method called successfully from FeedbackRepository");
            return feedback;
        } catch (error) {
            console.log("Unable to find feedback, findById method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findByBusId(busId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const feedback = await Feedback.find({ busId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Feedback.countDocuments({ busId });

            console.log("Feedback found successfully, findByBusId method called successfully from FeedbackRepository");
            return { feedback, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find feedback, findByBusId method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findByUserId(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const feedback = await Feedback.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Feedback.countDocuments({ userId });

            console.log("Feedback found successfully, findByUserId method called successfully from FeedbackRepository");
            return { feedback, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find feedback, findByUserId method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const feedback = await Feedback.findByIdAndUpdate(id, payload, { new: true });
            if (!feedback) {
                console.log("No feedback found with the given ID.");
                throw new Error("feedback not found");
            }
            console.log("Feedback updated successfully, update method called successfully from FeedbackRepository");
            return feedback;
        } catch (error) {
            console.log("Unable to update feedback, update method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async getAverageRating(busId) {
        try {
            const averageRating = await Feedback.getAverageRating(busId);
            console.log("Average rating calculated successfully, getAverageRating method called successfully from FeedbackRepository");
            return averageRating;
        } catch (error) {
            console.log("Unable to calculate average rating, getAverageRating method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async getFeedbackStats(busId) {
        try {
            const stats = await Feedback.getFeedbackStats(busId);
            console.log("Feedback stats calculated successfully, getFeedbackStats method called successfully from FeedbackRepository");
            return stats;
        } catch (error) {
            console.log("Unable to calculate feedback stats, getFeedbackStats method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findByStatus(status, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const feedback = await Feedback.find({ status })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Feedback.countDocuments({ status });

            console.log("Feedback found successfully, findByStatus method called successfully from FeedbackRepository");
            return { feedback, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find feedback, findByStatus method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const feedback = await Feedback.find()
                .populate('userId', 'name email')
                .populate('busId', 'busNumber')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Feedback.countDocuments();

            console.log("All feedback found successfully, findAll method called successfully from FeedbackRepository");
            return { feedback, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find all feedback, findAll method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }

    async findRecent(limit = 5) {
        try {
            const feedback = await Feedback.find()
                .sort({ createdAt: -1 })
                .limit(limit);

            console.log("Recent feedback found successfully, findRecent method called successfully from FeedbackRepository");
            return feedback;
        } catch (error) {
            console.log("Unable to find recent feedback, findRecent method called from FeedbackRepository and throws error: ", error);
            throw error;
        }
    }
}

export default FeedbackRepository;
