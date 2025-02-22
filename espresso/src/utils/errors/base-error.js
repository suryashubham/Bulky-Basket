class BaseError extends Error {
    constructor(errorType, message, statusCode, apiLayer) {
        super(message);
        this.errorType = errorType;
        this.statusCode = statusCode;
        this.apiLayer = apiLayer || 'unknown';
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = BaseError;