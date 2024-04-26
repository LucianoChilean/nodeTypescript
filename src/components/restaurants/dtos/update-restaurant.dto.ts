export class UpdateRestaurantDto {

    private constructor(
        public readonly id: number,
        public nombre: string,
        public direccion: string,
        public ciudad: string,
        public telefono: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.direccion) returnObj.direccion = this.direccion;
        if (this.ciudad) returnObj.ciudad = this.ciudad;
        if (this.telefono) returnObj.telefono = this.telefono;

        return returnObj;
    }


    static create(object: { [key: string]: any }): [string?, UpdateRestaurantDto?] {
        const { id, nombre, direccion, ciudad, telefono } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }

        if (!nombre) return ['Falta el nombre'];
        if (!direccion) return ['Falta el email'];
        if (!ciudad) return ['Falta la contraseña'];
        if (!telefono) return ['Contraseña demasiado corta'];

        return [undefined, new UpdateRestaurantDto(id, nombre, direccion, ciudad, telefono)];

    }


}