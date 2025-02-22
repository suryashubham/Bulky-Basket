const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base-error.js');
const { REPOSITORY_LAYER } = require('../common/constants.js');

class DatabaseError extends BaseError {
    constructor(message, statusCode) {
        super('DatabaseError', message, statusCode || StatusCodes.INTERNAL_SERVER_ERROR, REPOSITORY_LAYER);
    }
}

module.exports = DatabaseError;