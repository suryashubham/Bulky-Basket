const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class ExternalServiceError extends BaseError {
    constructor(message, apiLayer) {
        super('ExternalServiceError', message, StatusCodes.BAD_GATEWAY, apiLayer)
    }
}

module.exports = ExternalServiceError;