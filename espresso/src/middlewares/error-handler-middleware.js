const { setErrorResponse } = require('../utils/common/setResponseConfig');

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode;

    const errorResponse = {
        success: false,
        error: setErrorResponse(err),
    };

    return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandlerMiddleware;
