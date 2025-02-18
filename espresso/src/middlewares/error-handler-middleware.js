const setError = require('../utils/common/set-error');

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode;

    const errorResponse = {
        success: false,
        error: setError(err),
    };

    return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandlerMiddleware;
