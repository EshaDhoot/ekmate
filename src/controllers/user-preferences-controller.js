import UserPreferencesService from "../services/user-preferences-service.js";

const userPreferencesService = new UserPreferencesService();

export const createOrUpdatePreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const preferences = await userPreferencesService.createOrUpdatePreferences(userId, req.body);
        return res.status(200).json({
            data: preferences,
            message: "Created or updated user preferences successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to create or update user preferences, error from user-preferences-controller: ", error);
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
            message: "Unable to create or update user preferences",
            error: error.message,
            success: false
        });
    }
};

export const getUserPreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const preferences = await userPreferencesService.getUserPreferences(userId);
        return res.status(200).json({
            data: preferences,
            message: "Fetched user preferences successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch user preferences, error from user-preferences-controller: ", error);
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
            message: "Unable to fetch user preferences",
            error: error.message,
            success: false
        });
    }
};

export const addFavoriteRoute = async (req, res) => {
    try {
        const { userId } = req.params;
        const { busId } = req.body;
        
        if (!busId) {
            return res.status(400).json({
                data: {},
                message: "Bus ID is required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const preferences = await userPreferencesService.addFavoriteRoute(userId, busId);
        return res.status(200).json({
            data: preferences,
            message: "Added favorite route successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to add favorite route, error from user-preferences-controller: ", error);
        if (error.message === "user not found") {
            return res.status(404).json({
                data: {},
                message: "User not found",
                error: error.message,
                success: false
            });
        }
        if (error.message === "bus not found") {
            return res.status(404).json({
                data: {},
                message: "Bus not found",
                error: error.message,
                success: false
            });
        }
        return res.status(500).json({
            data: {},
            message: "Unable to add favorite route",
            error: error.message,
            success: false
        });
    }
};

export const removeFavoriteRoute = async (req, res) => {
    try {
        const { userId } = req.params;
        const { busId } = req.body;
        
        if (!busId) {
            return res.status(400).json({
                data: {},
                message: "Bus ID is required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const preferences = await userPreferencesService.removeFavoriteRoute(userId, busId);
        return res.status(200).json({
            data: preferences,
            message: "Removed favorite route successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to remove favorite route, error from user-preferences-controller: ", error);
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
            message: "Unable to remove favorite route",
            error: error.message,
            success: false
        });
    }
};

export const updateNotificationSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const { notificationSettings } = req.body;
        
        if (!notificationSettings) {
            return res.status(400).json({
                data: {},
                message: "Notification settings are required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const preferences = await userPreferencesService.updateNotificationSettings(userId, notificationSettings);
        return res.status(200).json({
            data: preferences,
            message: "Updated notification settings successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update notification settings, error from user-preferences-controller: ", error);
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
            message: "Unable to update notification settings",
            error: error.message,
            success: false
        });
    }
};

export const updateClassSchedule = async (req, res) => {
    try {
        const { userId } = req.params;
        const { classSchedule } = req.body;
        
        if (!classSchedule) {
            return res.status(400).json({
                data: {},
                message: "Class schedule is required",
                error: "Missing required parameter",
                success: false
            });
        }
        
        const preferences = await userPreferencesService.updateClassSchedule(userId, classSchedule);
        return res.status(200).json({
            data: preferences,
            message: "Updated class schedule successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to update class schedule, error from user-preferences-controller: ", error);
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
            message: "Unable to update class schedule",
            error: error.message,
            success: false
        });
    }
};

export const getFavoriteRoutes = async (req, res) => {
    try {
        const { userId } = req.params;
        const favoriteRoutes = await userPreferencesService.getFavoriteRoutes(userId);
        return res.status(200).json({
            data: favoriteRoutes,
            message: "Fetched favorite routes successfully",
            error: {},
            success: true
        });
    } catch (error) {
        console.log("Unable to fetch favorite routes, error from user-preferences-controller: ", error);
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
            message: "Unable to fetch favorite routes",
            error: error.message,
            success: false
        });
    }
};
