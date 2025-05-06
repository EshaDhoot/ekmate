import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    routes: [
        {
            pickupPoint: {
                type: String,
            },
            time: {
                type: String,
            }
        }
    ],
    destination: {
        type: String,
    }
});


const Bus = mongoose.model('Bus', busSchema);
export default Bus;