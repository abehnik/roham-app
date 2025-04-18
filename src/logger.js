var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'logs/Roham.Server-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '50m',
    maxFiles: '15d'
});

transport.on('error', error => {
    // log or handle errors here
});

transport.on('rotate', (oldFilename, newFilename) => {
    // do something fun
});

var logger = winston.createLogger({
    transports: [
        transport
    ]
});

/**
 * log method
 * @param {*} log_text 
 * @param {*} log_type 
 */
exports.log = (log_text, log_type = 'error') => {
    switch (log_type) {
        case 'error':
            console.error(log_text);
            logger.error(log_text);
            break;
        case 'info':
            console.info(log_text);
            logger.info(log_text);
            break;
        case 'warn':
            console.warn(log_text);
            logger.warn(log_text);
            break;
    }
};