const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('./base-error.js');

class AuthenticationError extends BaseError {
    constructor(message) {
        super('AuthenticationError', message, StatusCodes.UNAUTHORIZED)
    }
}

module.exports = AuthenticationError;