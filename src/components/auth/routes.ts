import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService, LogService } from '../../service';





export class Authroutes {


    static get routes(): Router {

        const router = Router();

        const log = new LogService();

        const authService = new AuthService(log);

        const controller = new AuthController(authService);

        // Definir las rutas
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);



        return router;
    }


}