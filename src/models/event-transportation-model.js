import mongoose from "mongoose";

const eventTransportationSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // organizer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    expectedAttendees: {
        type: Number,
        required: true
    },
    transportationNeeds: {
        pickupPoints: [{
            location: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            estimatedPassengers: {
                type: Number,
                default: 0
            }
        }],
        returnPoints: [{
            location: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            estimatedPassengers: {
                type: Number,
                default: 0
            }
        }]
    },
    assignedBuses: [{
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus'
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver'
        },
        route: {
            pickupPoint: {
                type: String
            },
            time: {
                type: String
            }
        },
        capacity: {
            type: Number,
            default: 0
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    specialInstructions: {
        type: String
    },
}, { timestamps: true });


const EventTransportation = mongoose.model('EventTransportation', eventTransportationSchema);
export default EventTransportation;
