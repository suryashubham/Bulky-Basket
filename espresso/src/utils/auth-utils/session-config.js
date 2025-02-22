const session = require('express-session');
const { SESSION_SECRET, SESSION_VAIDITY, APP_ENV } = require('../../config/server-config');

const sessionMiddleware = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: APP_ENV === 'production',
        httpOnly: true,
        maxAge: SESSION_VAIDITY,
    },
});

module.exports = sessionMiddleware;
