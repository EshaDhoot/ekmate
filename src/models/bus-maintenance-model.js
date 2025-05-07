import mongoose from "mongoose";

const busMaintenanceSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    maintenanceType: {
        type: String,
        enum: ['routine', 'repair', 'inspection', 'emergency', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    cost: {
        type: Number,
        default: 0
    },
    technician: {
        name: {
            type: String
        },
        contact: {
            type: String
        }
    },
    parts: [{
        name: {
            type: String
        },
        quantity: {
            type: Number
        },
        cost: {
            type: Number
        }
    }],
    notes: {
        type: String
    },
    images: [{
        type: String // URLs to images stored in cloud storage
    }],
    documents: [{
        type: String // URLs to documents stored in cloud storage
    }],
    mileage: {
        type: Number // Current mileage at maintenance
    },
    nextScheduledMaintenance: {
        type: Date
    }
}, { timestamps: true });

// Indexes for efficient queries
busMaintenanceSchema.index({ busId: 1, scheduledDate: -1 });
busMaintenanceSchema.index({ status: 1 });
busMaintenanceSchema.index({ nextScheduledMaintenance: 1 });

// Static method to get upcoming maintenance
busMaintenanceSchema.statics.getUpcomingMaintenance = async function(days = 30) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return this.find({
        scheduledDate: { $gte: today, $lte: futureDate },
        status: 'scheduled'
    }).sort({ scheduledDate: 1 }).populate('busId');
};

// Static method to get maintenance history for a bus
busMaintenanceSchema.statics.getMaintenanceHistory = async function(busId) {
    return this.find({
        busId,
        status: 'completed'
    }).sort({ completedDate: -1 });
};

const BusMaintenance = mongoose.model('BusMaintenance', busMaintenanceSchema);
export default BusMaintenance;
