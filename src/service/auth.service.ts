import { LoginUserDto, RegisterUserDto } from '../components/auth/dtos';
import { CustomError } from '../components/auth/errors/custom.error';
import { JwtAdapter, bcryptAdapter, envs } from '../config';
import { prisma } from '../database/mysql';
import { LogService } from './log.service';



export class AuthService {

  // DI
  constructor(
    public readonly log: LogService
  ) { }


  public async registerUser(registerUserDto: RegisterUserDto) {


    const existUser = await prisma.users.findFirst({
      where: { email: registerUserDto.email }
    });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const { password } = registerUserDto;

      // Encriptar la contraseña
      registerUserDto.password = bcryptAdapter.hash(password);

      const user = await prisma.users.create({
        data: registerUserDto
      })


      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      this.log.savelog({ type: 'success', operation: 'POST', message: '[AuthService] registerUser', createdAt: new Date() });

      return {
        user: registerUserDto,
        token: token,
      };

    } catch (error) {
      this.log.savelog({ type: 'error', operation: 'POST', message: '[AuthService] registerUser', createdAt: new Date() });
      throw CustomError.internalServer(`${error}`);
    }

  }


  public async loginUser(loginUserDto: LoginUserDto) {


    const user = await prisma.users.findFirst({
      where: { email: loginUserDto.email }
    });
    //UserModel.findOne({ email: loginUserDto.email });
    if (!user) {

      this.log.savelog({ type: 'error', operation: 'POST', message: '[AuthService] loginUser - Email no existe', createdAt: new Date() });
      throw CustomError.badRequest('Email no existe')
    };

    const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isMatching) {
      this.log.savelog({ type: 'error', operation: 'POST', message: '[AuthService] loginUser - password no valida', createdAt: new Date() });
      throw CustomError.badRequest('Password no valida')
    };


    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) {
      this.log.savelog({ type: 'error', operation: 'POST', message: '[AuthService] loginUser - error al crear token JWT', createdAt: new Date() });
      throw CustomError.internalServer('Error al crear token JWT')
    };

    this.log.savelog({ type: 'success', operation: 'POST', message: '[AuthService] loginUser', createdAt: new Date() });

    return {
      user: user,
      token: token,
    }

  }


}