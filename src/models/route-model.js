import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    startLocation: {
        type: String,
        required: true,
        trim: true
    },
    endLocation: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        required: true,
        min: 0
    },
    estimatedTime: {
        type: Number, // in minutes
        required: true,
        min: 0
    },
    stops: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        arrivalTime: {
            type: String,
            required: false
        },
        departureTime: {
            type: String,
            required: false
        }
    }],
    path: {
        type: {
            type: String,
            enum: ['LineString'],
            default: 'LineString'
        },
        coordinates: {
            type: [[Number]],
            required: false
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    busCount: {
        type: Number,
        default: 0
    },
    passengerCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create indexes for efficient querying
routeSchema.index({ startLocation: 'text', endLocation: 'text' });
routeSchema.index({ 'stops.location': '2dsphere' });
routeSchema.index({ path: '2dsphere' });

const Route = mongoose.model('Route', routeSchema);

export default Route;
