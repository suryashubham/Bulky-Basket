const winston = require('winston');
const moment = require('moment-timezone');
require('winston-daily-rotate-file'); // This registers the transport
const { APP_ENV } = require('../../config/server-config.js');

// Create a custom format that adds UTC and local timestamps to the log info
const addTimestamps = winston.format((info) => {
  info.utcTimestamp = moment.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
  info.localTimestamp = moment().format('YYYY-MM-DD HH:mm:ss [Local Time]');
  return info;
});

// Determine environment mode
const isDevelopment = APP_ENV.toLowerCase() === 'dev';

const transports = [];

// Console transport for development with JSON output
if (isDevelopment) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        addTimestamps(),
        winston.format.colorize(),
        winston.format.json()
      )
    })
  );
}

// Daily rotate file transports with JSON formatting
transports.push(
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    format: winston.format.combine(
      addTimestamps(),
      winston.format.json()
    )
  }),
  new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d',
    zippedArchive: true,
    format: winston.format.combine(
      addTimestamps(),
      winston.format.json()
    )
  })
);

// Create and export the logger instance
const logger = winston.createLogger({
  level: 'info',
  transports: transports
});

module.exports = logger;
