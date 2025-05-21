import UserPreferencesRepository from "../repositories/user-preferences-repository.js";
import UserRepository from "../repositories/user-repository.js";
import BusRepository from "../repositories/bus-repository.js";

class UserPreferencesService {
    constructor() {
        this.userPreferencesRepository = new UserPreferencesRepository();
        this.userRepository = new UserRepository();
        this.busRepository = new BusRepository();
    }

    async createOrUpdatePreferences(userId, payload) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }
            try {
                await this.userPreferencesRepository.findByUserId(userId);
                return await this.userPreferencesRepository.update(userId, payload);
            } catch (error) {
                if (error.message === "preferences not found") {
                    payload.userId = userId;
                    return await this.userPreferencesRepository.create(payload);
                }
                throw error;
            }
        } catch (error) {
            console.log("createOrUpdatePreferences method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async getUserPreferences(userId) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            try {
                const preferences = await this.userPreferencesRepository.findByUserId(userId);
                console.log("getUserPreferences method called successfully from UserPreferencesService");
                return preferences;
            } catch (error) {
                // If preferences not found, create default preferences
                if (error.message === "preferences not found") {
                    const defaultPreferences = {
                        userId,
                        favoriteRoutes: [],
                        notificationSettings: {
                            pushNotifications: {
                                enabled: true,
                                busDelays: true,
                                routeChanges: true,
                                approachingBus: true,
                                specialEvents: true
                            },
                            emailNotifications: {
                                enabled: true,
                                dailySchedule: false,
                                weeklySchedule: true,
                                specialEvents: true
                            }
                        },
                        classSchedule: [],
                        language: 'en',
                        accessibilitySettings: {
                            highContrast: false,
                            screenReader: false,
                            textToSpeech: false
                        }
                    };

                    // Create the preferences in the database
                    return await this.userPreferencesRepository.create(defaultPreferences);
                }
                throw error;
            }
        } catch (error) {
            console.log("getUserPreferences method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async addFavoriteRoute(userId, busId) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const preferences = await this.userPreferencesRepository.addFavoriteRoute(userId, busId);
            console.log("addFavoriteRoute method called successfully from UserPreferencesService");
            return preferences;
        } catch (error) {
            console.log("addFavoriteRoute method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async removeFavoriteRoute(userId, busId) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const preferences = await this.userPreferencesRepository.removeFavoriteRoute(userId, busId);
            console.log("removeFavoriteRoute method called successfully from UserPreferencesService");
            return preferences;
        } catch (error) {
            console.log("removeFavoriteRoute method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async updateNotificationSettings(userId, notificationSettings) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const preferences = await this.userPreferencesRepository.updateNotificationSettings(userId, notificationSettings);
            console.log("updateNotificationSettings method called successfully from UserPreferencesService");
            return preferences;
        } catch (error) {
            console.log("updateNotificationSettings method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async updateClassSchedule(userId, classSchedule) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const preferences = await this.userPreferencesRepository.updateClassSchedule(userId, classSchedule);
            console.log("updateClassSchedule method called successfully from UserPreferencesService");
            return preferences;
        } catch (error) {
            console.log("updateClassSchedule method called from UserPreferencesService and throws error: ", error);
            throw error;
        }
    }

    async getFavoriteRoutes(userId) {
        try {
            // Validate that the user exists
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error("user not found");
            }

            const preferences = await this.userPreferencesRepository.findByUserId(userId);

            // Populate the favorite routes with bus details
            const favoriteRoutes = [];
            for (const busId of preferences.favoriteRoutes) {
                try {
                    const bus = await this.busRepository.findById(busId);
                    favoriteRoutes.push(bus);
                } catch (error) {
                    console.log(`Error fetching bus with ID ${busId}: `, error);
                    // Skip this bus if it can't be found
                }
            }

            console.log("getFavoriteRoutes method called successfully from UserPreferencesService");
            return favoriteRoutes;
        } catch (error) {
            console.log("getFavoriteRoutes method called from UserPreferencesService and throws error: ", error);

            // If preferences not found, return empty array
            if (error.message === "preferences not found") {
                return [];
            }

            throw error;
        }
    }
}

export default UserPreferencesService;
