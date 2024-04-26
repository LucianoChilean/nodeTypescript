import { CustomError } from '../components/auth/errors/custom.error';
import { prisma } from '../database/mysql/index';
import { LogService } from './log.service';
import { CreateRestaurantDto } from '../components/restaurants/dtos/register-restaurant.dto';
import { UpdateRestaurantDto } from '../components/restaurants/dtos/update-restaurant.dto';



export class RestaurantService {

    constructor(
        public readonly log: LogService
    ) { }

    public createRestaurant = async (createRestaurantDto: CreateRestaurantDto) => {

        const restaurantExists = await prisma.restaurants.findFirst({
            where: { nombre: createRestaurantDto.nombre }
        });
        if (restaurantExists) throw CustomError.badRequest('Este restaurant ya existe');

        try {

            const response = await prisma.restaurants.create({
                data: createRestaurantDto!
            });

            this.log.savelog({ type: 'success', operation: 'POST', message: '[RestaurantService] createRestaurant', createdAt: new Date() });
            return response;

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'POST', message: '[RestaurantService] createRestaurant', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }

    }


    public getAllRestaurant = async () => {

        try {

            const restaurants = await prisma.restaurants.findMany({
                include: {
                    menu: true,
                }
            });
            if (!restaurants) throw CustomError.badRequest('No hay datos de restaurants en la base de datos');

            this.log.savelog({ type: 'success', operation: 'GET', message: '[RestaurantService] getAllRestaurant', createdAt: new Date() });
            return restaurants;

        } catch (error) {
            this.log.savelog({ type: 'success', operation: 'GET', message: '[RestaurantService] getAllRestaurant', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }

    }

    public getRestaurant = async (id: number) => {


        try {
            const restaurant = await this.getRestaurantById(id);
            if (!restaurant) throw CustomError.badRequest('Restaurant no existe');
            this.log.savelog({ type: 'success', operation: 'GET', message: '[RestaurantService] getRestaurant', createdAt: new Date() });
            return restaurant;

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[RestaurantService] getRestaurant', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }

    public getRestaurantMenu = async (id: number) => {


        const restaurant = await this.getRestaurantById(id);
        if (!restaurant) throw CustomError.badRequest('Restaurant no existe');

        try {

            const restaurantMenus = await prisma.restaurants.findMany({
                where: {
                    id
                },
                select: {
                    menu: true
                },
            });


            this.log.savelog({ type: 'success', operation: 'GET', message: '[RestaurantService] getRestaurantMenu', createdAt: new Date() });
            return restaurantMenus;

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[RestaurantService] getRestaurantMenu', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);

        }

    }

    public updateRestaurant = async (updateRestaurantDto: UpdateRestaurantDto) => {


        const restaurant = await this.getRestaurantById(updateRestaurantDto.id);
        if (!restaurant) throw CustomError.badRequest('Restaurant no existe');

        try {

            await prisma.restaurants.update({
                where: {
                    id: updateRestaurantDto.id,
                },
                data: updateRestaurantDto!.values
            });

            this.log.savelog({ type: 'success', operation: 'PUT', message: '[RestaurantService] updateRestaurant', createdAt: new Date() });

            return {
                message: 'Datos actualizados',
                data: {
                    updateRestaurantDto
                }
            }

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'PUT', message: '[RestaurantService] updateRestaurant', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }

    public deleteRestaurant = async (id: number) => {
        try {
            const restaurant = await this.getRestaurantById(id);

            if (!restaurant) throw CustomError.badRequest('Restaurant no existe');

            await prisma.restaurants.delete({
                where: { id },
            })

            this.log.savelog({ type: 'success', operation: 'DELETE', message: '[RestaurantService] deleteRestaurant', createdAt: new Date() });
            return {
                message: "Eliminado",
                restaurant
            };

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'POST', message: '[RestaurantService] deleteRestaurant', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }

    private getRestaurantById = async (id: number) => {

        try {

            const restaurant = await prisma.restaurants.findFirst({
                where: { id },
                include: {
                    menu: true,
                }
            });

            return restaurant;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }



    }


}