import { Router } from "express";
import { RestaurantsController } from "./restaurants.controller";
import { LogService, RestaurantService } from "../../service";
import { AuthMiddleware } from "../../middleware/auth.middleware";



export class RestaurantsRoutes {


    static get routes(): Router {

        const router = Router();

        const log = new LogService();

        const restaurantService = new RestaurantService(log);

        const controller = new RestaurantsController(restaurantService);

        router.get('/', [AuthMiddleware.validateJWT], controller.getAllRestaurant);
        router.get('/:id', [AuthMiddleware.validateJWT], controller.getRestaurant);
        router.get('/getmenu/:id', [AuthMiddleware.validateJWT], controller.getRestaurantMenu);

        router.post('/', [AuthMiddleware.validateJWT], controller.createRestaurant);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateRestaurant);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deteleRestaurant);

        return router;
    }

}