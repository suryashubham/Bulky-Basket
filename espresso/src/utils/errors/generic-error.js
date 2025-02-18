const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class GenericError extends BaseError {
    constructor(message, statusCode, apiLayer) {
        super('GenericError', message, statusCode || StatusCodes.INTERNAL_SERVER_ERROR, apiLayer)
    }
}

module.exports = GenericError;