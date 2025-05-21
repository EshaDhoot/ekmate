import UserRepository from "../repositories/user-repository.js";
import { generateOTP, sendOTPByEmail, hashOTP, verifyHashedOTP } from "../helpers/OTP-helper.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(payload) {
        try {
            const user = await this.userRepository.create(payload);
            console.log("create method called successfully from UserService to create a new user.");
            return user;
        } catch (error) {
            console.log("create method called from UserService and throws error: ", error);
            if (error.message === "user already exists") {
                throw new Error("user already exists");
            }
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.userRepository.findByEmail(email);
            console.log("findByEmail method called successfully from UserService to find user by email.");
            return user;
        } catch (error) {
            if (error.message === "user not found") {
                console.log("User not found error caught in UserService.");
                throw new Error("user not found");
            }
            console.log("Unexpected error in UserService findByEmail method:", error);
            throw new Error("An unexpected error occurred while finding the user.");
        }

    }

    async sendOTP(payload) {
        try {
            const email = payload.email;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('user not found');
            }
            const OTP = generateOTP();
            sendOTPByEmail(email, OTP);
            await this.userRepository.update(email, hashOTP(OTP));
            console.log('send otp called successfully from UserService');
            return true;
        } catch (error) {
            console.log('unable to send otp, UserService throws error: ', error);
            if (error.message === 'user not found') {
                throw new Error('user not found');
            }
            throw error;
        }
    }

    async signIn(data) {
        try {
            const user = await this.userRepository.findByEmail(data.email);
            const isPasswordMatch = await user.comparePassword(data.password);
            if (!isPasswordMatch) {
                throw new Error('Incorrect Password');
            }
            if (!user.isVerified) {
                throw new Error('Email not verified');
            }

            // Generate and return token for all users (including admin)
            const token = user.genJWT();

            // Log user details for debugging
            console.log('User signing in:', {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            });

            return {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                }
            };
        }
        catch (error) {
            console.log('unable to sign in, UserService throws error: ', error);
            if(error.message === 'user not found') {
                throw new Error('user not found');
            }
            throw error;
        }
    }

    async findUnverifiedUsers() {
        try {
            const unverifiedUsers = await this.userRepository.findUnverifiedUsers();
            console.log('Unverified users fetched successfully.');
            return unverifiedUsers;
        } catch (error) {
            console.error('Error fetching unverified users:', error);
            throw new Error('An error occurred while fetching unverified users.');
        }
    }

    async deleteUser(email) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error("user not found");
            }
            await this.userRepository.delete(email);
            console.log(`User with email ${email} deleted.`);
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepository.findById(userId);
            console.log("getUserById method called successfully from UserService.");
            return user;
        } catch (error) {
            console.log("Error in getUserById method from UserService:", error);
            if (error.message === "user not found") {
                throw new Error("user not found");
            }
            throw error;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const updatedUser = await this.userRepository.updateById(userId, updateData);
            console.log("updateUser method called successfully from UserService.");
            return updatedUser;
        } catch (error) {
            console.log("Error in updateUser method from UserService:", error);
            throw error;
        }
    }

    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            // Verify current password
            const isPasswordMatch = await user.comparePassword(currentPassword);
            if (!isPasswordMatch) {
                throw new Error("Incorrect current password");
            }

            // Update password
            user.password = newPassword;
            await user.save();

            console.log("changePassword method called successfully from UserService.");
            return true;
        } catch (error) {
            console.log("Error in changePassword method from UserService:", error);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error("user not found");
            }
            console.log("findByEmail method called successfully from UserService.");
            return user;
        } catch (error) {
            console.log("Error in findByEmail method from UserService:", error);
            throw error;
        }
    }

    async verifyAdminOTP(email, otp) {
        try {
            console.log(`UserService.verifyAdminOTP called with email: ${email}, otp: ${otp}`);

            // Find user by email
            const user = await this.userRepository.findByEmail(email);
            console.log(`User found:`, user ? {
                id: user._id,
                email: user.email,
                role: user.role,
                hasOtp: !!user.otp
            } : 'No user found');

            // Check if user exists and is an admin
            if (!user) {
                console.log(`User not found with email: ${email}`);
                throw new Error("user not found");
            }

            if (user.role !== 'admin') {
                console.log(`User ${email} is not an admin. Role: ${user.role}`);
                throw new Error("Access denied. Admin role required.");
            }

            // Verify OTP using the helper function
            console.log(`Verifying OTP: ${otp} against stored OTP: ${user.otp}`);
            const isValidOTP = verifyHashedOTP(otp, user.otp);
            console.log(`OTP validation result: ${isValidOTP}`);

            if (!isValidOTP) {
                console.log(`Invalid OTP provided for user: ${email}`);
                throw new Error("Invalid OTP");
            }

            // Clear OTP after successful verification
            console.log(`Clearing OTP for user: ${email}`);
            user.otp = null;
            await user.save();

            // Generate JWT token for admin
            console.log(`Generating JWT token for admin: ${email}`);
            const token = user.genJWT();

            return {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            console.log("Error in verifyAdminOTP method from UserService:", error);
            throw error;
        }
    }

    async getUsersCount() {
        try {
            const count = await this.userRepository.countUsers();
            console.log("getUsersCount method called successfully from UserService");
            return count;
        } catch (error) {
            console.log("getUsersCount method called from UserService and throws error: ", error);
            throw error;
        }
    }

    async getAllUsers(page = 1, limit = 10, query = {}) {
        try {
            const users = await this.userRepository.findAll(page, limit, query);
            console.log("getAllUsers method called successfully from UserService");
            return users;
        } catch (error) {
            console.log("getAllUsers method called from UserService and throws error: ", error);
            throw error;
        }
    }
}

export default UserService;