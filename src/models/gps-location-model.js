import mongoose from "mongoose";

const gpsLocationSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        default: 0
    },
    heading: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Index for efficient queries by busId and timestamp
gpsLocationSchema.index({ busId: 1, timestamp: -1 });

// Method to get the latest location for a specific bus
gpsLocationSchema.statics.getLatestLocation = async function(busId) {
    return this.findOne({ busId, isActive: true }).sort({ timestamp: -1 });
};

// Method to get location history for a specific bus
gpsLocationSchema.statics.getLocationHistory = async function(busId, startTime, endTime) {
    return this.find({
        busId,
        timestamp: { $gte: startTime, $lte: endTime }
    }).sort({ timestamp: 1 });
};

const GPSLocation = mongoose.model('GPSLocation', gpsLocationSchema);
export default GPSLocation;
