export class UpdateMenuDto {

    private constructor(
        public readonly id: number,
        public nombre: string,
        public ingredientes: string,
        public precio: number,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.ingredientes) returnObj.ingredientes = this.ingredientes;
        if (this.precio) returnObj.ciudad = this.precio;

        return returnObj;
    }


    static create(object: { [key: string]: any }): [string?, UpdateMenuDto?] {
        const { id, nombre, ingredientes, precio } = object;

        if (!id || isNaN(Number(id))) {
            return ['debe ser un número valido'];
        }
        if (!nombre) return ['Falta el nombre'];
        if (!ingredientes) return ['Faltan los ingredientes'];
        if (!precio) return ['Falta el precio'];

        return [undefined, new UpdateMenuDto(id, nombre, ingredientes, precio)];

    }


}