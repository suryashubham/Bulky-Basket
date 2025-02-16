const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('./base-error.js');

class AuthorizationError extends BaseError {
    constructor(message) {
        super('AuthorizationError', message, StatusCodes.FORBIDDEN)
    }
}

module.exports = AuthorizationError;