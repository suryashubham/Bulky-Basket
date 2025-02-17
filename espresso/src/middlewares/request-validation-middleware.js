const { StatusCodes } = require("http-status-codes");
const ValidationError = require("../utils/errors/validation-error");

function validateRequest(req, res, next) {
    next();
}

function validateUserCreationRequest(req, res, next) {
    const missingFields = [];

    if (!req.body?.firstName) missingFields.push('firstName');
    if (typeof req.body.firstName !== 'string') throw new ValidationError('Invalid request. First name must be a string.');

    if (!req.body?.role) {
        missingFields.push('role');
    } else if (!['seller', 'buyer', 'admin', 'staff'].includes(req.body.role)) {
        throw new ValidationError('Invalid request. Role must be one of seller, buyer, admin, staff.');
    }
    if (!req.body?.mobile) {
        missingFields.push('mobile');
    } else if (!/^\d{10,12}$/.test(req.body.mobile)) {
        throw new ValidationError('Invalid request. Mobile number must be between 10 to 12 digits.');
    }
    if (!req.body?.mobile) missingFields.push('mobile');
    if (missingFields.length > 0) throw new ValidationError(`Invalid request. Missing required fields: ${missingFields.join(', ')}`);
    
    if (req.body?.firstName && req.body?.role && req.body?.mobile) next();
}

module.exports = { 
    validateRequest, 
    validateUserCreationRequest 
};