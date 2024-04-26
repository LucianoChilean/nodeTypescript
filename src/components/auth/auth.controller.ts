import { Request, Response } from 'express';
import { CustomError } from './errors/custom.error';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthService } from '../../service';
import { loggerAdapter } from '../../config';



export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }


    public registerUser = (req: Request, res: Response) => {

        loggerAdapter.info("[AuthController] registerUser");
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error })


        this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));

    }



    public loginUser = (req: Request, res: Response) => {

        loggerAdapter.info("[AuthController] loginUser");
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error })


        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));

    }



}