import { CustomError } from '../components/auth/errors/custom.error';
import { logModel } from '../database';

export interface log {
    type: string;
    operation: string;
    message: string;
    createdAt: Date;
}

export class LogService {



    constructor(
    ) {

    }


    public async savelog(dataLog: log) {

        const { type, message, operation, createdAt } = dataLog;

        try {
            const log = new logModel();

            log.type = type;
            log.operation = operation;
            log.message = message;
            log.createdAt = createdAt;

            await log.save();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }









}