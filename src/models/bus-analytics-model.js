import mongoose from "mongoose";

const busAnalyticsSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    routeData: [{
        pickupPoint: {
            type: String,
            required: true
        },
        scheduledTime: {
            type: String,
            required: true
        },
        actualTime: {
            type: String
        },
        delay: {
            type: Number, // in minutes
            default: 0
        },
        passengerCount: {
            type: Number,
            default: 0
        },
        capacity: {
            type: Number,
            default: 0
        }
    }],
    totalPassengers: {
        type: Number,
        default: 0
    },
    averageOccupancy: {
        type: Number, // percentage
        default: 0
    },
    peakHours: [{
        hour: Number,
        passengerCount: Number
    }],
    fuelConsumption: {
        type: Number, // in liters
        default: 0
    },
    totalDistance: {
        type: Number, // in kilometers
        default: 0
    },
    averageSpeed: {
        type: Number, // in km/h
        default: 0
    },
    trafficConditions: {
        type: String,
        enum: ['light', 'moderate', 'heavy', 'severe'],
        default: 'moderate'
    },
    weatherConditions: {
        type: String,
        default: 'normal'
    }
}, { timestamps: true });

// Indexes for efficient queries
busAnalyticsSchema.index({ busId: 1, date: -1 });
busAnalyticsSchema.index({ date: 1 });

// Static method to get analytics for a specific date range
busAnalyticsSchema.statics.getAnalyticsForDateRange = async function(busId, startDate, endDate) {
    return this.find({
        busId,
        date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
};

// Static method to get peak hour data
busAnalyticsSchema.statics.getPeakHourData = async function(date) {
    return this.aggregate([
        { $match: { date: { $eq: date } } },
        { $unwind: "$peakHours" },
        { $sort: { "peakHours.passengerCount": -1 } },
        { $limit: 5 }
    ]);
};

const BusAnalytics = mongoose.model('BusAnalytics', busAnalyticsSchema);
export default BusAnalytics;
