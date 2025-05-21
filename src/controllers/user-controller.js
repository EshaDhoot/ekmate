import UserService from "../services/user-service.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const userService = new UserService();

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/uploads/profile-pictures';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

export const signUp = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        await userService.sendOTP(req.body);
        return res.status(201).json({
            data: user,
            message: "created a new user and sent otp successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("unable to create a new user, error from user-controller: ", error);
        if (error.message === "user already exists") {
            return res.status(409).json({
                data: {},
                message: "user already exists",
                error: error.errmsg,
                success: false
            })
        }
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "Cannot send otp, user with the given email does not exist.",
                error: error,
                success: false
            })
        }
        return res.status(500).json({
            data: {},
            message: "unable to create a new user and send otp",
            error: error,
            success: false
        })
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userService.findByEmail(email);
        if (!user || !verifyHashedOTP(otp, user.otp)) {
            return res.status(401).send({
                data: {},
                success: false,
                message: 'Invalid OTP',
                error: 'Invalid OTP'
            });
        }
        user.isVerified = true;
        user.otp = null;
        await user.save();
        return res.status(201).json({
            message: "otp verified",
            err: {},
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        if (error.message === "user not found") {
            return res.status(404).json({
                message: "User with the given email does not exist.",
                data: {},
                success: false,
                err: error
            })
        }
        return res.status(500).json({
            message: "otp verification failed",
            data: {},
            success: false,
            err: error
        });
    }
};

// Verify OTP for admin login
export const verifyAdminOTP = async (req, res) => {
    try {
        console.log("verifyAdminOTP endpoint called with body:", req.body);
        const { email, otp } = req.body;

        if (!email || !otp) {
            console.log("Missing email or OTP in request body");
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false,
                data: {},
                err: { message: "Missing required fields" }
            });
        }

        console.log(`Attempting to verify OTP for admin: ${email}, OTP: ${otp}`);

        // Use the service method to verify admin OTP
        const result = await userService.verifyAdminOTP(email, otp);
        console.log("Admin OTP verification successful, result:", result);

        return res.status(200).json({
            message: "Admin OTP verified successfully",
            success: true,
            data: result.token,
            err: {}
        });
    } catch (error) {
        console.log("Error in verifyAdminOTP:", error);

        if (error.message === "user not found") {
            return res.status(404).json({
                message: "User not found",
                data: {},
                success: false,
                err: { message: "user not found" }
            });
        }

        if (error.message === "Access denied. Admin role required.") {
            return res.status(403).json({
                message: "Access denied. Admin role required.",
                data: {},
                success: false,
                err: { message: "Not an admin user" }
            });
        }

        if (error.message === "Invalid OTP") {
            return res.status(401).json({
                message: "Invalid OTP",
                data: {},
                success: false,
                err: { message: "Invalid OTP" }
            });
        }

        return res.status(500).json({
            message: "Admin OTP verification failed",
            data: {},
            success: false,
            err: { message: error.message || "Internal server error" }
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const result = await userService.signIn(req.body);
        console.log('Sign-in result from service:', result);

        // Return the token and user data for all users
        return res.status(200).json({
            message: 'Successfully signed in',
            success: true,
            data: {
                token: result.token,
                user: result.user
            },
            err: {}
        });
    } catch (error) {
        if (error.message === "user not found") {
            return res.status(404).json({
                message: "User with the given email does not exist.",
                data: {},
                success: false,
                err: { message: error.message }
            });
        }
        if (error.message === "Incorrect Password") {
            return res.status(401).json({
                message: "Incorrect Password, please try again",
                data: {},
                success: false,
                err: { message: error.message }
            });
        }
        if (error.message === "Email not verified") {
            return res.status(401).json({
                message: "Email not verified, please verify your email",
                data: {},
                success: false,
                err: { message: error.message }
            });
        }
        return res.status(500).json({
            message: "Unable to sign in",
            data: {},
            success: false,
            err: { message: error.message }
        });
    }
}

// Get current user profile
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserById(userId);

        // Remove sensitive information
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            reg_number: user.reg_number,
            branch: user.branch,
            year: user.year,
            phone_number: user.phone_number,
            role: user.role,
            language: user.language,
            accessibilitySettings: user.accessibilitySettings,
            profilePicture: user.profilePicture,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200).json({
            data: userResponse,
            message: "User profile fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch user profile, error from user-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to fetch user profile",
            error: error.message,
            success: false
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        // Prevent updating sensitive fields
        delete updateData.password;
        delete updateData.email; // Email should be updated through a separate process with verification
        delete updateData.isVerified;
        delete updateData.role; // Role changes should be handled by admin

        const updatedUser = await userService.updateUser(userId, updateData);

        // Remove sensitive information
        const userResponse = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            reg_number: updatedUser.reg_number,
            branch: updatedUser.branch,
            year: updatedUser.year,
            phone_number: updatedUser.phone_number,
            role: updatedUser.role,
            language: updatedUser.language,
            accessibilitySettings: updatedUser.accessibilitySettings,
            profilePicture: updatedUser.profilePicture,
            lastLogin: updatedUser.lastLogin,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        };

        return res.status(200).json({
            data: userResponse,
            message: "User profile updated successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update user profile, error from user-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to update user profile",
            error: error.message,
            success: false
        });
    }
};

// Change user password
export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                data: {},
                message: "Current password and new password are required",
                error: "Missing required fields",
                success: false
            });
        }

        await userService.changePassword(userId, currentPassword, newPassword);

        return res.status(200).json({
            data: {},
            message: "Password changed successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to change password, error from user-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "Incorrect current password") {
            return res.status(401).json({
                data: {},
                message: "Current password is incorrect",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to change password",
            error: error.message,
            success: false
        });
    }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                data: {},
                message: "No file uploaded",
                error: "Missing file",
                success: false
            });
        }

        const userId = req.user.id;
        const profilePicturePath = `/uploads/profile-pictures/${req.file.filename}`;

        const updatedUser = await userService.updateUser(userId, { profilePicture: profilePicturePath });

        return res.status(200).json({
            data: {
                profilePicture: updatedUser.profilePicture
            },
            message: "Profile picture uploaded successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to upload profile picture, error from user-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to upload profile picture",
            error: error.message,
            success: false
        });
    }
};

// Get all users with pagination and filtering
export const getAllUsers = async (req, res) => {
    try {
        const { page, limit, search, role } = req.query;

        const result = await userService.getAllUsers(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            { search, role }
        );

        return res.status(200).json({
            data: result,
            message: "Users fetched successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch users, error from user-controller: ", error);
        return res.status(500).json({
            data: {},
            message: "Unable to fetch users",
            error: error.message,
            success: false
        });
    }
};