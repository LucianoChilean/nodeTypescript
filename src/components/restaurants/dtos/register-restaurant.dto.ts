export class CreateRestaurantDto {

    private constructor(
        public nombre: string,
        public direccion: string,
        public ciudad: string,
        public telefono: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateRestaurantDto?] {
        const { nombre, direccion, ciudad, telefono } = object;

        if (!nombre) return ['Falta el nombre'];
        if (!direccion) return ['Falta el email'];
        if (!ciudad) return ['Falta la ciudad'];
        if (!telefono) return ['Falta numero de telefono'];

        return [undefined, new CreateRestaurantDto(nombre, direccion, ciudad, telefono)];

    }


}