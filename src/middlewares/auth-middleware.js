import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/server-config.js';
import User from '../models/user-model.js';
import Driver from '../models/driver-model.js';

export const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                message: "No auth token provided",
                data: {},
                success: false,
                err: "Authentication required"
            });
        }
        
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                message: "Invalid auth token format",
                data: {},
                success: false,
                err: "Authentication required"
            });
        }
        
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Check if the token is for a user or a driver
        if (decoded.role === 'driver') {
            const driver = await Driver.findById(decoded.id);
            
            if (!driver) {
                return res.status(401).json({
                    message: "Driver not found",
                    data: {},
                    success: false,
                    err: "Authentication failed"
                });
            }
            
            req.user = driver;
            req.userType = 'driver';
        } else {
            const user = await User.findById(decoded.id);
            
            if (!user) {
                return res.status(401).json({
                    message: "User not found",
                    data: {},
                    success: false,
                    err: "Authentication failed"
                });
            }
            
            req.user = user;
            req.userType = 'user';
        }
        
        next();
    } catch (error) {
        console.log("Authentication error: ", error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                data: {},
                success: false,
                err: "Authentication required"
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                data: {},
                success: false,
                err: "Authentication required"
            });
        }
        
        return res.status(500).json({
            message: "Authentication error",
            data: {},
            success: false,
            err: error.message
        });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (req.userType === 'driver') {
            return res.status(403).json({
                message: "Access denied. Drivers cannot perform this action.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Admin role required.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
        
        next();
    } catch (error) {
        console.log("Authorization error: ", error);
        return res.status(500).json({
            message: "Authorization error",
            data: {},
            success: false,
            err: error.message
        });
    }
};

export const isFaculty = (req, res, next) => {
    try {
        if (req.userType === 'driver') {
            return res.status(403).json({
                message: "Access denied. Drivers cannot perform this action.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
        
        if (req.user.role !== 'faculty' && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Faculty or admin role required.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
        
        next();
    } catch (error) {
        console.log("Authorization error: ", error);
        return res.status(500).json({
            message: "Authorization error",
            data: {},
            success: false,
            err: error.message
        });
    }
};

export const isDriver = (req, res, next) => {
    try {
        if (req.userType !== 'driver') {
            return res.status(403).json({
                message: "Access denied. Driver role required.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
        
        next();
    } catch (error) {
        console.log("Authorization error: ", error);
        return res.status(500).json({
            message: "Authorization error",
            data: {},
            success: false,
            err: error.message
        });
    }
};

export const isOwnerOrAdmin = async (req, res, next) => {
    try {
        const { userId } = req.params;
        
        if (req.user.role === 'admin' || req.user._id.toString() === userId) {
            next();
        } else {
            return res.status(403).json({
                message: "Access denied. You can only access your own data.",
                data: {},
                success: false,
                err: "Authorization failed"
            });
        }
    } catch (error) {
        console.log("Authorization error: ", error);
        return res.status(500).json({
            message: "Authorization error",
            data: {},
            success: false,
            err: error.message
        });
    }
};
