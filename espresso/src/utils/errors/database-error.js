const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class DatabaseError extends BaseError {
    constructor(message, statusCode) {
        super('DatabaseError', message, statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = DatabaseError;