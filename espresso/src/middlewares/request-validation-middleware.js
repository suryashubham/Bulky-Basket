const ValidationError = require("../utils/errors/validation-error");
const logger = require("../utils/common/logger");

function validateRequest(req, res, next) {
    next();
}

function validateFirstName(firstName) {
    if (!firstName) {
        return 'firstName';
    }
    if (typeof firstName !== 'string') {
        const errorMessage = 'Invalid request. First name must be a string.';
        logger.error(errorMessage);
        throw new ValidationError(errorMessage);
    }
    return null;
}

function validateRole(role) {
    if (!role) {
        return 'role';
    }
    if (!['seller', 'buyer', 'admin', 'staff'].includes(role)) {
        const errorMessage = 'Invalid request. Role must be one of seller, buyer, admin, staff.';
        logger.error(errorMessage);
        throw new ValidationError(errorMessage);
    }
    return null;
}

function validateMobile(mobile) {
    if (!mobile) {
        return 'mobile';
    }
    if (!/^\d{10,12}$/.test(mobile)) {
        const errorMessage = 'Invalid request. Mobile number must be between 10 to 12 digits.';
        logger.error(errorMessage);
        throw new ValidationError(errorMessage);
    }
    return null;
}

function validatePassword(password) {
    if (!password) {
        return 'password';
    }
    if (password.length < 8 || password.length > 16) {
        const errorMessage = 'Invalid request. Password must be between 8-16 characters.';
        logger.error(errorMessage);
        throw new ValidationError(errorMessage);
    }
    return null;
}

function validateUserCreationRequest(req, res, next) {
    const missingFields = [];

    const firstNameError = validateFirstName(req.body?.firstName);
    if (firstNameError) missingFields.push(firstNameError);

    const roleError = validateRole(req.body?.role);
    if (roleError) missingFields.push(roleError);

    const mobileError = validateMobile(req.body?.mobile);
    if (mobileError) missingFields.push(mobileError);

    const passwordError = validatePassword(req.body?.password);
    if (passwordError) missingFields.push(passwordError);

    if (missingFields.length > 0) {
        const errorMessage = `Invalid request. Missing required fields: ${missingFields.join(', ')}`;
        logger.error(errorMessage);
        throw new ValidationError(errorMessage);
    }

    next();
}

module.exports = { 
    validateRequest, 
    validateUserCreationRequest 
};