const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class ValidationError extends BaseError {
    constructor(message,apiLayer) {
        super('ValidationError', message, StatusCodes.BAD_REQUEST, apiLayer)
    }
}

module.exports = ValidationError;