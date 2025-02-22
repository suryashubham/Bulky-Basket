const { authenticateJWT } = require("../utils/auth-utils/jwtUtils");


const authenticateSession = (req, res, next) => {
    if (req.session.userId) return next();
    else {
        try {
            authenticateJWT(req, res, next);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    authenticateSession
};