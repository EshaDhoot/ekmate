import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    message: {
        type: String,
    }
});


const ContactForm = mongoose.model('ContactForm', contactFormSchema);
export default ContactForm;