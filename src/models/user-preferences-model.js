import mongoose from "mongoose";

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    favoriteRoutes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }],
    notificationSettings: {
        pushNotifications: {
            enabled: {
                type: Boolean,
                default: true
            },
            busDelays: {
                type: Boolean,
                default: true
            },
            routeChanges: {
                type: Boolean,
                default: true
            },
            approachingBus: {
                type: Boolean,
                default: true
            },
            specialEvents: {
                type: Boolean,
                default: true
            }
        },
        emailNotifications: {
            enabled: {
                type: Boolean,
                default: true
            },
            dailySchedule: {
                type: Boolean,
                default: false
            },
            weeklySchedule: {
                type: Boolean,
                default: true
            },
            specialEvents: {
                type: Boolean,
                default: true
            }
        }
    },
    classSchedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String,
        endTime: String,
        location: String
    }],
    language: {
        type: String,
        default: 'en' // Default language is English
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
        }
    }
}, { timestamps: true });

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);
export default UserPreferences;
