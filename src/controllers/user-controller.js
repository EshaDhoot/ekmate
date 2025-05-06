import UserService from "../services/user-service.js";
import { verifyHashedOTP } from "../helpers/OTP-helper.js";
const userService = new UserService();

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
        if(error.message === "user not found") {
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

export const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(200).json({
            message: 'Successsully signed in',
            success: true,
            data: response,
            err: {}
        });
    } catch (error) {
        if (error.message === "user not found") {
            return res.status(404).json({
                message: "User with the given email does not exist.",
                data: {},
                success: false,
                err: error
            })
        }
        if (error.message === "Incorrect Password") {
            return res.status(401).json({
                message: "Incorrect Password, please try again",
                data: {},
                success: false,
                err: error
            })
        }
        if (error.message === "Email not verified") {
            return res.status(401).json({
                message: "Email not verified, please verify your email",
                data: {},
                success: false,
                err: error
            })
        }
        return res.status(500).json({
            message: "unable to sign in, error from user-controller",
            data: {},
            success: false,
            err: error
        });
    }
}