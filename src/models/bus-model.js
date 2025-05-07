import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    routes: [
        {
            pickupPoint: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            estimatedArrivalTime: {
                type: String
            },
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        }
    ],
    destination: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        default: 50
    },
    currentPassengers: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'maintenance', 'out_of_service', 'reserved'],
        default: 'active'
    },
    features: {
        airConditioned: {
            type: Boolean,
            default: true
        },
        wheelchairAccessible: {
            type: Boolean,
            default: false
        },
        wifiEnabled: {
            type: Boolean,
            default: false
        },
        usbCharging: {
            type: Boolean,
            default: false
        }
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    lastMaintenance: {
        type: Date
    },
    nextMaintenance: {
        type: Date
    },
    fuelType: {
        type: String,
        enum: ['diesel', 'petrol', 'cng', 'electric', 'hybrid'],
        default: 'diesel'
    },
    fuelEfficiency: {
        type: Number // km per liter
    },
    manufacturingYear: {
        type: Number
    },
    model: {
        type: String
    },
    currentLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

// Indexes for efficient queries
busSchema.index({ status: 1 });
busSchema.index({ "features.wheelchairAccessible": 1 });

const Bus = mongoose.model('Bus', busSchema);
export default Bus;