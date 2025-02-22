const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class AuthenticationError extends BaseError {
    constructor(message, statusCode, apiLayer) {
        super('AuthenticationError', message, statusCode || StatusCodes.UNAUTHORIZED, apiLayer)
    }
}

module.exports = AuthenticationError;