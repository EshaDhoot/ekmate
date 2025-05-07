import DriverRepository from "../repositories/driver-repository.js";
import BusRepository from "../repositories/bus-repository.js";
import { generateOTP, sendOTPByEmail, hashOTP } from "../helpers/OTP-helper.js";

class DriverService {
    constructor() {
        this.driverRepository = new DriverRepository();
        this.busRepository = new BusRepository();
    }

    async create(payload) {
        try {
            const driver = await this.driverRepository.create(payload);
            console.log("create method called successfully from DriverService to create a new driver.");
            return driver;
        } catch (error) {
            console.log("create method called from DriverService and throws error: ", error);
            if (error.message === "driver already exists") {
                throw new Error("driver already exists");
            }
            throw error;
        }
    }

    async getDriverById(id) {
        try {
            const driver = await this.driverRepository.findById(id);
            console.log("getDriverById method called successfully from DriverService");
            return driver;
        } catch (error) {
            console.log("getDriverById method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async getDriverByEmail(email) {
        try {
            const driver = await this.driverRepository.findByEmail(email);
            console.log("getDriverByEmail method called successfully from DriverService");
            return driver;
        } catch (error) {
            console.log("getDriverByEmail method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async getAllDrivers(page = 1, limit = 10) {
        try {
            const drivers = await this.driverRepository.findAll(page, limit);
            console.log("getAllDrivers method called successfully from DriverService");
            return drivers;
        } catch (error) {
            console.log("getAllDrivers method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async getActiveDrivers(page = 1, limit = 10) {
        try {
            const drivers = await this.driverRepository.findActiveDrivers(page, limit);
            console.log("getActiveDrivers method called successfully from DriverService");
            return drivers;
        } catch (error) {
            console.log("getActiveDrivers method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async getDriversWithExpiringLicenses(days = 30) {
        try {
            const drivers = await this.driverRepository.getDriversWithExpiringLicenses(days);
            console.log("getDriversWithExpiringLicenses method called successfully from DriverService");
            return drivers;
        } catch (error) {
            console.log("getDriversWithExpiringLicenses method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async updateDriver(id, payload) {
        try {
            const driver = await this.driverRepository.update(id, payload);
            console.log("updateDriver method called successfully from DriverService");
            return driver;
        } catch (error) {
            console.log("updateDriver method called from DriverService and throws error: ", error);
            if (error.message === "driver already exists") {
                throw new Error("driver already exists");
            }
            throw error;
        }
    }

    async assignBus(driverId, busId) {
        try {
            // Validate that the bus exists
            const bus = await this.busRepository.findById(busId);
            if (!bus) {
                throw new Error("bus not found");
            }

            const driver = await this.driverRepository.assignBus(driverId, busId);
            
            // Update the bus with the driver information
            await this.busRepository.update(busId, { driver: driverId });
            
            console.log("assignBus method called successfully from DriverService");
            return driver;
        } catch (error) {
            console.log("assignBus method called from DriverService and throws error: ", error);
            throw error;
        }
    }

    async sendOTP(data) {
        try {
            const driver = await this.driverRepository.findByEmail(data.email);
            const otp = generateOTP();
            const hashedOTP = await hashOTP(otp);
            await this.driverRepository.updateOTP(data.email, hashedOTP);
            await sendOTPByEmail(data.email, otp);
            console.log("sendOTP method called successfully from DriverService");
            return true;
        } catch (error) {
            console.log("sendOTP method called from DriverService and throws error: ", error);
            if (error.message === "driver not found") {
                throw new Error("driver not found");
            }
            throw error;
        }
    }

    async verifyOTP(data) {
        try {
            const driver = await this.driverRepository.findByEmail(data.email);
            const hashedOTP = await hashOTP(data.otp);
            if (driver.otp !== hashedOTP) {
                throw new Error("Invalid OTP");
            }
            await this.driverRepository.update(driver._id, { isVerified: true, otp: null });
            console.log("verifyOTP method called successfully from DriverService");
            return true;
        } catch (error) {
            console.log("verifyOTP method called from DriverService and throws error: ", error);
            if (error.message === "driver not found") {
                throw new Error("driver not found");
            }
            throw error;
        }
    }

    async signIn(data) {
        try {
            const driver = await this.driverRepository.findByEmail(data.email);
            const isPasswordMatch = await driver.comparePassword(data.password);
            if (!isPasswordMatch) {
                throw new Error('Incorrect Password');
            }
            if (!driver.isVerified) {
                throw new Error('Email not verified');
            }
            const token = driver.genJWT();
            return token;
        } catch (error) {
            console.log('unable to sign in, DriverService throws error: ', error);
            if (error.message === 'driver not found') {
                throw new Error('driver not found');
            }
            throw error;
        }
    }
}

export default DriverService;
