import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    tripDate: {
        type: Date,
        required: true
    },
    feedbackType: {
        type: String,
        enum: ['general', 'cleanliness', 'driver', 'punctuality', 'mechanical', 'safety', 'other'],
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments: {
        type: String,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['pending', 'under_review', 'resolved', 'dismissed'],
        default: 'pending'
    },
    adminResponse: {
        type: String,
        default: ''
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String // URLs to images stored in cloud storage
    }]
}, { timestamps: true });

// Index for efficient queries
feedbackSchema.index({ busId: 1, createdAt: -1 });
feedbackSchema.index({ userId: 1, createdAt: -1 });
feedbackSchema.index({ status: 1 });

// Static method to get average rating for a bus
feedbackSchema.statics.getAverageRating = async function(busId) {
    const result = await this.aggregate([
        { $match: { busId: mongoose.Types.ObjectId(busId) } },
        { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);
    
    return result.length > 0 ? result[0].averageRating : 0;
};

// Static method to get feedback statistics
feedbackSchema.statics.getFeedbackStats = async function(busId) {
    return this.aggregate([
        { $match: { busId: mongoose.Types.ObjectId(busId) } },
        { 
            $group: { 
                _id: "$feedbackType", 
                count: { $sum: 1 },
                averageRating: { $avg: "$rating" }
            } 
        }
    ]);
};

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
