import { CustomError } from "../components/auth/errors/custom.error";
import { prisma } from "../database";
import { LogService } from "./log.service";
import { CreateMenuDto } from '../components/menus/dtos/register-menu.dto';
import { UpdateMenuDto } from "../components/menus/dtos/update-menu.dto";


export class MenuService {


    constructor(
        public readonly log: LogService
    ) {

    }


    public createMenu = async (createMenuDto: CreateMenuDto) => {


        try {

            const response = await prisma.menus.create({
                data: createMenuDto!
            });
            this.log.savelog({ type: 'success', operation: 'POST', message: '[MenuService] createMenu', createdAt: new Date() });
            return response;

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'POST', message: '[MenuService]  error de registro', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }


    public getAllMenu = async () => {

        try {
            const menus = await prisma.menus.findMany({
                include: {
                    restaurant: true
                }
            });
            if (!menus) throw CustomError.badRequest('No hay menus en la base de datos');

            this.log.savelog({ type: 'success', operation: 'GET', message: '[MenuService]  GetAllMenu', createdAt: new Date() });

            return menus;
        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[MenuService]  getAllMenu', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }

    public getMenu = async (id: number) => {

        try {
            const menu = await this.getMenuById(id);
            if (!menu) throw CustomError.badRequest('Menu no existe');
            this.log.savelog({ type: 'success', operation: 'GET', message: '[MenuService]  getMenu', createdAt: new Date() });
            return menu;
        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[MenuService]  getMenu', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }

    }

    public updateMenu = async (updateMenuDto: UpdateMenuDto) => {

        const menu = await this.getMenuById(updateMenuDto.id);
        if (!menu) throw CustomError.badRequest('Restaurant no existe');

        try {

            await prisma.menus.update({
                where: {
                    id: updateMenuDto.id,
                },
                data: updateMenuDto!.values
            });

            this.log.savelog({ type: 'success', operation: 'PUT', message: '[MenuService]  updateMenu', createdAt: new Date() });
            return {
                message: 'Datos actualizados',
                data: {
                    updateMenuDto
                }
            }

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[MenuService]  updateMenu', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);
        }
    }

    public deleteMenu = async (id: number) => {

        try {
            const menu = await this.getMenuById(id);
            if (!menu) throw CustomError.badRequest('Menu no existe');

            await prisma.menus.delete({
                where: { id }
            });

            this.log.savelog({ type: 'success', operation: 'GET', message: '[MenuService]  deleteMenu', createdAt: new Date() });

            return {
                message: "Menu Eliminado",
                menu
            }

        } catch (error) {
            this.log.savelog({ type: 'error', operation: 'GET', message: '[MenuService]  deleteMenu', createdAt: new Date() });
            throw CustomError.internalServer(`${error}`);

        }

    }

    private getMenuById = async (id: number) => {

        const Menu = await prisma.menus.findFirst({
            where: { id }
        });


        return Menu;

    }


}