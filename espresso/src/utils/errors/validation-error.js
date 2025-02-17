const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class ValidationError extends BaseError {
    constructor(message) {
        super('ValidationError', message, StatusCodes.BAD_REQUEST)
    }
}

module.exports = ValidationError;