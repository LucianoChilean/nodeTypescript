import { Request, Response } from "express";
import { MenuService } from "../../service";
import { loggerAdapter } from "../../config";
import { CustomError } from "../auth/errors/custom.error";
import { CreateMenuDto } from './dtos/register-menu.dto';
import { UpdateMenuDto } from "./dtos/update-menu.dto";


export class MenusController {

    constructor(
        public readonly menuService: MenuService
    ) {
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    public getAllMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[MenuController] GetAll");
        this.menuService.getAllMenu()
            .then(menus => res.json(menus))
            .catch(error => this.handleError(error, res));

    }

    public getMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[MenuController] Get");
        const id = +req.params.id;
        this.menuService.getMenu(id)
            .then(menu => res.json(menu))
            .catch(error => this.handleError(error, res));

    }

    public createMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[MenuController] Create");
        const [error, createMenuDto] = CreateMenuDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.menuService.createMenu(createMenuDto!)
            .then(menu => res.json(menu))
            .catch(error => this.handleError(error, res));

    }

    public updateMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[MenuController] Update");
        const id = +req.params.id;
        const [error, updateMenuDto] = UpdateMenuDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.menuService.updateMenu(updateMenuDto!)
            .then(menu => res.json(menu))
            .catch(error => this.handleError(error, res));

    }

    public deteleMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[MenuController] Delete");
        const id = +req.params.id;
        this.menuService.deleteMenu(id)
            .then(menu => res.json(menu))
            .catch(error => this.handleError(error, res));

    }

}