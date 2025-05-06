import UserRepository from "../repositories/user-repository.js";
import { generateOTP, sendOTPByEmail, hashOTP } from "../helpers/OTP-helper.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(payload) {
        try {
            const user = this.userRepository.create(payload);
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
            const token = user.genJWT();
            return token;
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
}

export default UserService;