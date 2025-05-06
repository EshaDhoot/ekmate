import mongoose from 'mongoose';
import { DB_URL } from './server-config.js';

export const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("connected to EKmate Database");
    } catch (error) {
        console.log("Error connecting to EKmate Database", error);
    }
}