const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('./base-error.js');

class DatabaseError extends BaseError {
    constructor(message) {
        super('DatabaseError', message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = DatabaseError;