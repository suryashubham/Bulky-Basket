const { UTILITY_LAYER } = require('../common/constants');
const { StatusCodes } = require('http-status-codes');
const ValidationError = require('../errors/validation-error');
const GenericError = require('../errors/generic-error');
const logger = require('../common/logger');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

async function hashPassword(plainPassword) {
    if (!plainPassword) {
        throw new ValidationError("Password is required for hashing.", UTILITY_LAYER);
    }
    try {
        const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        return hash;
    } catch (error) {
        logger.error("Error hashing password:", error);
        throw new GenericError("Error hashing password.", StatusCodes.INTERNAL_SERVER_ERROR, UTILITY_LAYER);
    }
}


async function verifyPassword(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
        throw new ValidationError("Both plain and hashed passwords are required for verification.", UTILITY_LAYER);
    }
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        logger.error("Error verifying password:", error);
        throw new GenericError("Error verifying password.", StatusCodes.INTERNAL_SERVER_ERROR, UTILITY_LAYER);
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
};
