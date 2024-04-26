import { Router } from "express";
import { MenusController } from "./menus.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { LogService, MenuService } from "../../service";


export class MenusRoutes {


    static get routes(): Router {

        const router = Router();

        const log = new LogService();

        const menuService = new MenuService(log);

        const controller = new MenusController(menuService);

        router.get('/', [AuthMiddleware.validateJWT], controller.getAllMenu);
        router.get('/:id', [AuthMiddleware.validateJWT], controller.getMenu);

        router.post('/', [AuthMiddleware.validateJWT], controller.createMenu);
        router.put('/:id', [AuthMiddleware.validateJWT], controller.updateMenu);
        router.delete('/:id', [AuthMiddleware.validateJWT], controller.deteleMenu);

        return router;
    }

}