import RouteRepository from "../repositories/route-repository.js";

class RouteService {
    constructor() {
        this.routeRepository = new RouteRepository();
    }

    async createRoute(payload) {
        try {
            const route = await this.routeRepository.create(payload);
            console.log("createRoute method called successfully from RouteService");
            return route;
        } catch (error) {
            console.log("createRoute method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async getRouteById(id) {
        try {
            const route = await this.routeRepository.findById(id);
            console.log("getRouteById method called successfully from RouteService");
            return route;
        } catch (error) {
            console.log("getRouteById method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async getAllRoutes(page = 1, limit = 10) {
        try {
            const routes = await this.routeRepository.findAll(page, limit);
            console.log("getAllRoutes method called successfully from RouteService");
            return routes;
        } catch (error) {
            console.log("getAllRoutes method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async updateRoute(id, payload) {
        try {
            const route = await this.routeRepository.update(id, payload);
            console.log("updateRoute method called successfully from RouteService");
            return route;
        } catch (error) {
            console.log("updateRoute method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async deleteRoute(id) {
        try {
            const route = await this.routeRepository.delete(id);
            console.log("deleteRoute method called successfully from RouteService");
            return route;
        } catch (error) {
            console.log("deleteRoute method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async getRoutesByLocation(location, page = 1, limit = 10) {
        try {
            const routes = await this.routeRepository.findByLocation(location, page, limit);
            console.log("getRoutesByLocation method called successfully from RouteService");
            return routes;
        } catch (error) {
            console.log("getRoutesByLocation method called from RouteService and throws error: ", error);
            throw error;
        }
    }

    async getPopularRoutes(limit = 5) {
        try {
            const routes = await this.routeRepository.findPopular(limit);
            console.log("getPopularRoutes method called successfully from RouteService");
            return routes;
        } catch (error) {
            console.log("getPopularRoutes method called from RouteService and throws error: ", error);
            throw error;
        }
    }
}

export default RouteService;
