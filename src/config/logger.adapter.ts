import pino from 'pino';

export const loggerAdapter = pino({
    transport: {
        target: 'pino-pretty'
    },
});
