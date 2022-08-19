import pino from 'pino';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    redact: ["hostname"],
    timestamp() {
        return `, ${new Date().toISOString()}`;
    }
});