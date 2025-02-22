const { APP_ENV } = require('../../config/server-config');

function setErrorResponse(error) {
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

function setSuccessResponse(message, data) {
    return {
        success: true,
        message: message || 'Successfully completed the request',
        data: data || {},
        error: {}
    }
}

module.exports = { 
    setErrorResponse, 
    setSuccessResponse 
};