import { format, createLogger, transports } from 'winston'

export const logger = createLogger({
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        new transports.Console({
            level: 'error',
            format: format.combine(
                        format.colorize(),
                        format.timestamp(),
                        format.splat(),
                        format.align(),
                        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                    )
        })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
                    format.colorize(),
                    format.timestamp(),
                    format.splat(),
                    format.align(),
                    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                )
    }));
}

export function attachLogger(app) {
    app.use((req, res, next) => {
        logger.log('verbose', `Incoming request to %s`, req.originalUrl, req.headers);
        next();
    })
}
