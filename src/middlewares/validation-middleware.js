import * as yup from 'yup';

export const validateEmailOrPhone = async (req, res, next) => {
    const schema = yup.object().shape({
        role: yup
            .string()
            .oneOf(["student", "faculty", "admin"], "Invalid role")
            .required("Role is required"),
        email: yup
            .string()
            .notRequired()
            .matches(
                /^[a-z]+@jietjodhpur\.ac\.in$/,
                "Invalid email, Enter correct faculty/admin email."
            ),
        phone_number: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .notRequired(),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one letter, one number, and one special character"
            ),
    });

    try {
        if (!req.body.email && !req.body.phone_number) {
            throw new yup.ValidationError(
                "Either email or phone number is required",
                req.body,
                "email|phone_number"
            );
        }
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.log("Error in validateEmailOrPhone middleware: ");
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during validation",
            error: error,
        });
    }
};

export const validateOTP = async (req, res, next) => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required"),
        otp: yup
            .string()
            .required("OTP is required")
            .matches(/^\d{6}$/, "OTP must be 6 digits"),
    });
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                success: false, message: "Validation failed", errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during validation",
            error: error,
        })
    }
}

export const validateSignIn = async (req, res, next) => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .matches(
                /^([a-z]+\.\d{2}[a-z]{4}\d{3}@jietjodhpur\.ac\.in|[a-z]+@jietjodhpur\.ac\.in)$/,
                "Invalid email. Please enter a valid email."
            ),
        phone_number: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .notRequired(),
        password: yup
            .string()
            .required("Password is required")
            // .min(8, "Password must be at least 8 characters long")
            // .matches(
            //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //     "Password must contain at least one letter, one number, and one special character"
            // ),
    });

    try {
        if (!req.body.email && !req.body.phone_number) {
            throw new yup.ValidationError(
                "Either email or phone number is required",
                req.body,
                "email|phone_number"
            );
        }
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during validation",
            error: error.message,
        });
    }
};
