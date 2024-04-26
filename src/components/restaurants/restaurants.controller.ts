import { Request, Response } from "express";
import { RestaurantService } from "../../service";
import { loggerAdapter } from "../../config";
import { CustomError } from "../auth/errors/custom.error";
import { CreateRestaurantDto } from "./dtos/register-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";


export class RestaurantsController {

    constructor(
        public readonly restaurantService: RestaurantService
    ) {
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    public getAllRestaurant = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] GetAll");
        this.restaurantService.getAllRestaurant()
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));
    }


    public getRestaurant = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] Get");
        const id = +req.params.id;
        this.restaurantService.getRestaurant(id)
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));

    }

    public getRestaurantMenu = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] GetMenus");
        const id = +req.params.id;
        this.restaurantService.getRestaurantMenu(id)
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));

    }

    public createRestaurant = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] Create");
        const [error, createRestaurantDto] = CreateRestaurantDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.restaurantService.createRestaurant(createRestaurantDto!)
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));

    }


    public updateRestaurant = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] Update");
        const id = +req.params.id;
        const [error, updateRestaurantDto] = UpdateRestaurantDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        this.restaurantService.updateRestaurant(updateRestaurantDto!)
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));
    }

    public deteleRestaurant = (req: Request, res: Response) => {
        loggerAdapter.info("[RestaurantController] Delete");
        const id = +req.params.id;
        this.restaurantService.deleteRestaurant(id)
            .then(restaurants => res.json(restaurants))
            .catch(error => this.handleError(error, res));
    }

}