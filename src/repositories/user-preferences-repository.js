import UserPreferences from "../models/user-preferences-model.js";

class UserPreferencesRepository {
    async create(payload) {
        try {
            const preferences = await UserPreferences.create(payload);
            console.log("New user preferences created successfully, create method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to create user preferences, create method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async findByUserId(userId) {
        try {
            const preferences = await UserPreferences.findOne({ userId });
            if (!preferences) {
                console.log("No preferences found for the given user ID.");
                throw new Error("preferences not found");
            }
            console.log("User preferences found successfully, findByUserId method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to find user preferences, findByUserId method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async update(userId, payload) {
        try {
            const preferences = await UserPreferences.findOneAndUpdate(
                { userId },
                payload,
                { new: true, upsert: true }
            );
            console.log("User preferences updated successfully, update method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to update user preferences, update method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async addFavoriteRoute(userId, busId) {
        try {
            const preferences = await UserPreferences.findOneAndUpdate(
                { userId },
                { $addToSet: { favoriteRoutes: busId } },
                { new: true, upsert: true }
            );
            console.log("Favorite route added successfully, addFavoriteRoute method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to add favorite route, addFavoriteRoute method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async removeFavoriteRoute(userId, busId) {
        try {
            const preferences = await UserPreferences.findOneAndUpdate(
                { userId },
                { $pull: { favoriteRoutes: busId } },
                { new: true }
            );
            console.log("Favorite route removed successfully, removeFavoriteRoute method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to remove favorite route, removeFavoriteRoute method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async updateNotificationSettings(userId, notificationSettings) {
        try {
            const preferences = await UserPreferences.findOneAndUpdate(
                { userId },
                { $set: { notificationSettings } },
                { new: true, upsert: true }
            );
            console.log("Notification settings updated successfully, updateNotificationSettings method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to update notification settings, updateNotificationSettings method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }

    async updateClassSchedule(userId, classSchedule) {
        try {
            const preferences = await UserPreferences.findOneAndUpdate(
                { userId },
                { $set: { classSchedule } },
                { new: true, upsert: true }
            );
            console.log("Class schedule updated successfully, updateClassSchedule method called successfully from UserPreferencesRepository");
            return preferences;
        } catch (error) {
            console.log("Unable to update class schedule, updateClassSchedule method called from UserPreferencesRepository and throws error: ", error);
            throw error;
        }
    }
}

export default UserPreferencesRepository;
