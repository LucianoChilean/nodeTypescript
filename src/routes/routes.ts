import { Router } from "express";
import {
    Authroutes,
    MenusRoutes,
    RestaurantsRoutes,
} from "../components";
import { loggerAdapter } from "../config";

export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        loggerAdapter.info('[Routes] AppRoutes');

        router.use('/api/auth', Authroutes.routes);
        router.use('/api/menu', MenusRoutes.routes);
        router.use('/api/restaurant', RestaurantsRoutes.routes);

        return router;
    }

}