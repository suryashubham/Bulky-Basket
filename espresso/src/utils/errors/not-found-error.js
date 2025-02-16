const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('./base-error.js');

class NotFoundError extends BaseError {
    constructor(message) {
        super('NotFoundError', message, StatusCodes.NOT_FOUND)
    }
}

module.exports = NotFoundError;