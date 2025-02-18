const {APP_ENV} = require('../../config/server-config');

function setError(error) {
    try {
        let errorResponse = {
            errorType: error.errorType,
            statusCode: error.statusCode,
            message: error.message,
        };

        if (APP_ENV.toLowerCase() === 'dev') errorResponse.stackTrace = error.stack;
        return errorResponse;
    } catch (error) {
        logger.error(`Something went wrong in setting eror:${error}`)
        return error;
    }

}

module.exports = setError;