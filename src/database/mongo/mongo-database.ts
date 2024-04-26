import mongoose from 'mongoose';
import { loggerAdapter } from '../../config';



interface Options {
  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {

  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      loggerAdapter.info('[MongoDB] conexion exitosa');
      return true;

    } catch (error) {
      loggerAdapter.error('[MongoDB] connection error');
      throw error;
    }

  }


}





