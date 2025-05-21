import User from '../models/user-model.js';

class UserRepository {
    async create(payload) {
        try {
            const user = await User.create(payload);
            console.log("new user created successfully, create method called successfully from UserRepository");
            return user;
        } catch (error) {
            if (error.code === 11000) {
                console.log("user already exists, create method called from UserRepository and throws error: ", error);
                throw new Error("user already exists");
            }
            console.log("unable to create a new user, create method called from UserRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                console.log("No user found with the given ID.");
                throw new Error("user not found");
            }
            console.log("user found successfully, findById method called successfully from UserRepository");
            return user;
        } catch (error) {
            console.log("unable to find user by ID, findById method called from UserRepository and throws error: ", error);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log("No user found with the given email.");
                throw new Error("user not found");
            }
            console.log("user found successfully, findByEmail method called successfully from UserRepository");
            return user;
        } catch (error) {
            console.log("unable to find user by email, findByEmail method called from UserRepository and throws error: ", error);
            throw error;
        }
    }

    async update(email, otp) {
        try {
            await User.updateOne(
                { email },
                { $set: { otp } },
            );
            console.log("user updated successfully, update method called successfully from UserRepository");
            return true;
        } catch (error) {
            console.log("unable to update user, update method called from UserRepository and throws error: ", error);
            throw error;
        }
    }
    async findUnverifiedUsers() {
        try {
            const unverifiedUsers = await User.find({ isVerified: false });
            return unverifiedUsers;
        } catch (error) {
            console.error("Error fetching unverified users from UserRepository:", error);
            throw new Error('An error occurred while fetching unverified users.');
        }
    }

    async countUsers() {
        try {
            const count = await User.countDocuments();
            console.log("User count retrieved successfully, countUsers method called successfully from UserRepository");
            return count;
        } catch (error) {
            console.log("Unable to count users, countUsers method called from UserRepository and throws error: ", error);
            throw error;
        }
    }
    async delete(email) {
        try {
            await User.deleteOne({ email });
            console.log("user deleted successfully, delete method called successfully from UserRepository");
            return true;
        } catch (error) {
            console.error("Error deleting user from repository:", error);
            throw error;
        }
    }

    async updateById(userId, updateData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                console.log("No user found with the given ID.");
                throw new Error("user not found");
            }

            console.log("user updated successfully, updateById method called successfully from UserRepository");
            return updatedUser;
        } catch (error) {
            console.log("unable to update user by ID, updateById method called from UserRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10, query = {}) {
        try {
            const skip = (page - 1) * limit;

            // Build the query
            const searchQuery = {};

            // Add search criteria if provided
            if (query.search) {
                searchQuery.$or = [
                    { name: { $regex: query.search, $options: 'i' } },
                    { email: { $regex: query.search, $options: 'i' } }
                ];
            }

            // Add role filter if provided
            if (query.role) {
                searchQuery.role = query.role;
            }

            // Execute the query with pagination
            const users = await User.find(searchQuery)
                .select('-password -otp') // Exclude sensitive fields
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await User.countDocuments(searchQuery);

            console.log("All users found successfully, findAll method called successfully from UserRepository");
            return {
                users,
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.log("Unable to find all users, findAll method called from UserRepository and throws error: ", error);
            throw error;
        }
    }
}

export default UserRepository;