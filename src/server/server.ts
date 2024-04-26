import express, { Router } from "express";
import path from 'path';
import cors from 'cors';
import { loggerAdapter } from "../config";

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    public start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(express.static(this.publicPath));

        //* Rutas de API REST
        this.app.use(this.routes);


        //* Ruta publica para mostrar APP
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            loggerAdapter.info(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

    public close() {
        this.serverListener?.close();
    }

}