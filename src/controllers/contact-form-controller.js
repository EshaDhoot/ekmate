import ContactForm from "../models/contact-form-model.js";

export const createQuery = async (req, res) => {
    try {
        const contactForm = await ContactForm.create(req.body);
        console.log("a new query has been submitted successfully, contact-form-controller");
        return res.status(201).json({
            data: contactForm,
            message: "a new query has been submitted successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("unable to submit query, error from contact-form-controller: ", error);
        res.status(500).json({
            data: {},
            message: "unable to submit query",
            error: error,
            success: false
        });
    }
}