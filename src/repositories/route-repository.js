import Route from "../models/route-model.js";

class RouteRepository {
    async create(payload) {
        try {
            const route = await Route.create(payload);
            console.log("New route created successfully, create method called successfully from RouteRepository");
            return route;
        } catch (error) {
            console.log("Unable to create route, create method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const route = await Route.findById(id);
            if (!route) {
                console.log("No route found with the given ID.");
                throw new Error("route not found");
            }
            console.log("Route found successfully, findById method called successfully from RouteRepository");
            return route;
        } catch (error) {
            console.log("Unable to find route, findById method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const routes = await Route.find()
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit);
            
            const total = await Route.countDocuments();
            
            console.log("All routes found successfully, findAll method called successfully from RouteRepository");
            return { routes, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find all routes, findAll method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const route = await Route.findByIdAndUpdate(id, payload, { new: true });
            if (!route) {
                console.log("No route found with the given ID.");
                throw new Error("route not found");
            }
            console.log("Route updated successfully, update method called successfully from RouteRepository");
            return route;
        } catch (error) {
            console.log("Unable to update route, update method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const route = await Route.findByIdAndDelete(id);
            if (!route) {
                console.log("No route found with the given ID.");
                throw new Error("route not found");
            }
            console.log("Route deleted successfully, delete method called successfully from RouteRepository");
            return route;
        } catch (error) {
            console.log("Unable to delete route, delete method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async findByLocation(location, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const routes = await Route.find({
                $or: [
                    { startLocation: { $regex: location, $options: 'i' } },
                    { endLocation: { $regex: location, $options: 'i' } }
                ]
            })
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit);
            
            const total = await Route.countDocuments({
                $or: [
                    { startLocation: { $regex: location, $options: 'i' } },
                    { endLocation: { $regex: location, $options: 'i' } }
                ]
            });
            
            console.log("Routes by location found successfully, findByLocation method called successfully from RouteRepository");
            return { routes, total, page, limit, pages: Math.ceil(total / limit) };
        } catch (error) {
            console.log("Unable to find routes by location, findByLocation method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }

    async findPopular(limit = 5) {
        try {
            // This is a placeholder implementation
            // In a real application, you would have some metric to determine popularity
            const routes = await Route.find()
                .sort({ passengerCount: -1 })
                .limit(limit);
            
            console.log("Popular routes found successfully, findPopular method called successfully from RouteRepository");
            return routes;
        } catch (error) {
            console.log("Unable to find popular routes, findPopular method called from RouteRepository and throws error: ", error);
            throw error;
        }
    }
}

export default RouteRepository;
