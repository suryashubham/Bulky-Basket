const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');

class NotFoundError extends BaseError {
    constructor(message, apiLayer) {
        super('NotFoundError', message, StatusCodes.NOT_FOUND, apiLayer)
    }
}

module.exports = NotFoundError;