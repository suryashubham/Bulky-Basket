const { SESSION_SECRET, JWT_TOKEN_VALIDITY } = require('../../config/server-config');
const { StatusCodes } = require('http-status-codes');
const AuthenticationError = require('../errors/authentication-error');
const UTILITY_LAYER = require('../common/constants');
const jwt = require('jsonwebtoken');

const generateJwtToken = (user) => {
    return jwt.sign({ id: user.id, mobile: user.mobile }, SESSION_SECRET, {
        expiresIn: JWT_TOKEN_VALIDITY,
    });
};

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;

    if (!token) throw new AuthenticationError('Unauthorized', StatusCodes.UNAUTHORIZED, UTILITY_LAYER);

    jwt.verify(token, SESSION_SECRET, (err, user) => {
        if (err) throw new AuthenticationError('Forbidden', StatusCodes.FORBIDDEN, UTILITY_LAYER);
        req.user = user;
        next();
    });
};

module.exports = {
    generateJwtToken,
    authenticateJWT,
};