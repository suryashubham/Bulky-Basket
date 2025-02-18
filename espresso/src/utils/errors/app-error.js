const { StatusCodes } = require('http-status-codes');
const BaseError  = require('./base-error.js');

class AppError extends BaseError {
    constructor(message, statusCode, apiLayer) {
        super('AppError', message, statusCode || StatusCodes.INTERNAL_SERVER_ERROR, apiLayer);
    }
}

module.exports = AppError;