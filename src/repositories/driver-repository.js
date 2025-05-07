import Driver from "../models/driver-model.js";

class DriverRepository {
    async create(payload) {
        try {
            const driver = await Driver.create(payload);
            console.log("New driver created successfully, create method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            if (error.code === 11000) {
                console.log("Driver already exists, create method called from DriverRepository and throws error: ", error);
                throw new Error("driver already exists");
            }
            console.log("Unable to create driver, create method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const driver = await Driver.findById(id);
            if (!driver) {
                console.log("No driver found with the given ID.");
                throw new Error("driver not found");
            }
            console.log("Driver found successfully, findById method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            console.log("Unable to find driver, findById method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const driver = await Driver.findOne({ email });
            if (!driver) {
                console.log("No driver found with the given email.");
                throw new Error("driver not found");
            }
            console.log("Driver found successfully, findByEmail method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            console.log("Unable to find driver, findByEmail method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findByPhone(phone_number) {
        try {
            const driver = await Driver.findOne({ phone_number });
            if (!driver) {
                console.log("No driver found with the given phone number.");
                throw new Error("driver not found");
            }
            console.log("Driver found successfully, findByPhone method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            console.log("Unable to find driver, findByPhone method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findByLicenseNumber(licenseNumber) {
        try {
            const driver = await Driver.findOne({ licenseNumber });
            if (!driver) {
                console.log("No driver found with the given license number.");
                throw new Error("driver not found");
            }
            console.log("Driver found successfully, findByLicenseNumber method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            console.log("Unable to find driver, findByLicenseNumber method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const drivers = await Driver.find()
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit);
            
            const total = await Driver.countDocuments();
            
            console.log("Drivers found successfully, findAll method called successfully from DriverRepository");
            return { drivers, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find drivers, findAll method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async findActiveDrivers(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const drivers = await Driver.find({ isActive: true })
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit);
            
            const total = await Driver.countDocuments({ isActive: true });
            
            console.log("Active drivers found successfully, findActiveDrivers method called successfully from DriverRepository");
            return { drivers, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find active drivers, findActiveDrivers method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async getDriversWithExpiringLicenses(days = 30) {
        try {
            const drivers = await Driver.getDriversWithExpiringLicenses(days);
            console.log("Drivers with expiring licenses found successfully, getDriversWithExpiringLicenses method called successfully from DriverRepository");
            return drivers;
        } catch (error) {
            console.log("Unable to find drivers with expiring licenses, getDriversWithExpiringLicenses method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const driver = await Driver.findByIdAndUpdate(id, payload, { new: true });
            if (!driver) {
                console.log("No driver found with the given ID.");
                throw new Error("driver not found");
            }
            console.log("Driver updated successfully, update method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            if (error.code === 11000) {
                console.log("Driver with the updated details already exists, update method called from DriverRepository and throws error: ", error);
                throw new Error("driver already exists");
            }
            console.log("Unable to update driver, update method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async updateOTP(email, otp) {
        try {
            await Driver.updateOne(
                { email },
                { $set: { otp } }
            );
            console.log("Driver OTP updated successfully, updateOTP method called successfully from DriverRepository");
            return true;
        } catch (error) {
            console.log("Unable to update driver OTP, updateOTP method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }

    async assignBus(id, busId) {
        try {
            const driver = await Driver.findByIdAndUpdate(
                id,
                { assignedBus: busId },
                { new: true }
            );
            
            if (!driver) {
                console.log("No driver found with the given ID.");
                throw new Error("driver not found");
            }
            
            console.log("Bus assigned successfully, assignBus method called successfully from DriverRepository");
            return driver;
        } catch (error) {
            console.log("Unable to assign bus, assignBus method called from DriverRepository and throws error: ", error);
            throw error;
        }
    }
}

export default DriverRepository;
