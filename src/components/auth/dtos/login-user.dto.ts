import { regularExps } from "../../../config";





export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Falta el email'];
    if (!regularExps.email.test(email)) return ['Email no valido'];
    if (!password) return ['Falta la contraseña'];
    if (password.length < 6) return ['Contraseña demasiado corta'];

    return [undefined, new LoginUserDto(email, password)];

  }


}