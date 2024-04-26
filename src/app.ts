
import { envs } from './config';
import { MongoDatabase } from './database';
import { AppRoutes } from './routes/routes';
import { Server } from './server/server';


(async () => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
        public_path: envs.PUBLIC_PATH
    });

    server.start();
}