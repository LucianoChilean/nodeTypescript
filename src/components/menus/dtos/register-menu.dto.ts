export class CreateMenuDto {

    private constructor(
        public nombre: string,
        public ingredientes: string,
        public precio: number,
        public restaurantId: number,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateMenuDto?] {
        const { nombre, ingredientes, precio, restaurantId } = object;

        if (!nombre) return ['Falta el nombre'];
        if (!ingredientes) return ['Faltan los ingredientes'];
        if (!precio) return ['Falta el precio'];
        if (!restaurantId) return ['Falta el restaurant'];

        return [undefined, new CreateMenuDto(nombre, ingredientes, precio, restaurantId)];

    }


}