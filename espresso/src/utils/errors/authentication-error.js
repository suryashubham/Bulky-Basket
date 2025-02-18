const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class AuthenticationError extends BaseError {
    constructor(message, apiLayer) {
        super('AuthenticationError', message, StatusCodes.UNAUTHORIZED, apiLayer)
    }
}

module.exports = AuthenticationError;