class BaseError extends Error {
    constructor(errorType, message, statusCode) {
        super(message);
        this.errorType = errorType,
        this.statusCode = statusCode,
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = BaseError;