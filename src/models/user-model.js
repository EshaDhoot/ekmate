import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { SECRET_KEY } from "../config/server-config.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reg_number: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    branch: {
        type: String,
    },
    year: {
        type: String,
    },
    phone_number: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'hi', 'gu', 'mr', 'ta', 'te', 'kn', 'ml', 'pa', 'bn'],
        default: 'en'
    },
    accessibilitySettings: {
        highContrast: {
            type: Boolean,
            default: false
        },
        screenReader: {
            type: Boolean,
            default: false
        },
        textToSpeech: {
            type: Boolean,
            default: false
        },
        fontSize: {
            type: String,
            enum: ['small', 'medium', 'large', 'extra-large'],
            default: 'medium'
        }
    },
    deviceToken: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password);
    }
    next();
});

userSchema.methods.comparePassword = async function compare(password) {
    return await argon2.verify(this.password, password);
}

userSchema.methods.genJWT = function generate() {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role || 'student'
    };
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1h'
    });
}


const User = mongoose.model('User', userSchema);
export default User;