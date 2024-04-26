import { regularExps } from '../../../config';


export class RegisterUserDto {

  private constructor(
    public nombre: string,
    public email: string,
    public password: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { nombre, email, password } = object;

    if (!nombre) return ['Falta el nombre'];
    if (!email) return ['Falta el email'];
    if (!regularExps.email.test(email)) return ['Email no valido'];
    if (!password) return ['Falta la contraseña'];
    if (password.length < 6) return ['Contraseña demasiado corta'];

    return [undefined, new RegisterUserDto(nombre, email, password)];

  }


}