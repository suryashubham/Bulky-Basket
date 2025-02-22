const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class AuthorizationError extends BaseError {
    constructor(message, apiLayer) {
        super('AuthorizationError', message, StatusCodes.FORBIDDEN, apiLayer)
    }
}

module.exports = AuthorizationError;