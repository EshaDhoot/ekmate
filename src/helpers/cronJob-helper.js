import cron from 'node-cron';
import UserService from "../services/user-service.js";
const userService = new UserService();

export const unverifiedUserCronJob = () => {
    cron.schedule(`*/10 * * * *`, async () => {
        try {
            console.log("Cron job executed at:", new Date());
            const unverifiedUsers = await userService.findUnverifiedUsers();
            unverifiedUsers.forEach(async (user) => {
                await userService.deleteUser(user.email);
                console.log(`Unverified user ${user.email} deleted after 10 minutes.`);
            });
        } catch (error) {
            console.log('Error in unverified user cron job:', error);
        }
    });
};
