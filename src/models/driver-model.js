import mongoose from "mongoose";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config/server-config.js";

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    licenseExpiry: {
        type: Date,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    dateOfBirth: {
        type: Date
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    assignedBus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    drivingExperience: {
        type: Number, // in years
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String
    },
    schedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String,
        endTime: String,
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus'
        }
    }],
    documents: [{
        type: String, // URLs to documents stored in cloud storage
        description: String
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    }
}, { timestamps: true });

// Indexes for efficient queries
driverSchema.index({ isActive: 1 });
driverSchema.index({ licenseExpiry: 1 });

// Hash password before saving
driverSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password);
    }
    next();
});

// Method to compare password
driverSchema.methods.comparePassword = async function compare(password) {
    return await argon2.verify(this.password, password);
};

// Method to generate JWT
driverSchema.methods.genJWT = function generate() {
    return jwt.sign(
        { id: this._id, email: this.email, role: 'driver' },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
};

// Static method to get drivers with expiring licenses
driverSchema.statics.getDriversWithExpiringLicenses = async function(days = 30) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return this.find({
        licenseExpiry: { $gte: today, $lte: futureDate },
        isActive: true
    }).sort({ licenseExpiry: 1 });
};

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
