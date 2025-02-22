const { SERVICE_LAYER } = require('../utils/common/constants');
const { StatusCodes } = require('http-status-codes');
const { generateJwtToken } = require('../utils/auth-utils/jwtUtils');
const { UserRepository } = require('../repositories');
const { hashPassword, verifyPassword } = require('../utils/auth-utils/passwordUtils.js')
const AppError = require('../utils/errors/app-error.js');
const logger = require('../utils/common/logger');

const userRepo = new UserRepository();

async function getUsers() {
    try {
        const users = await userRepo.getAll();
        return users;
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`)
        throw new AppError('Cannot fetch data of all the users', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addUser(data) {
    const ALREADY_EXISTING_USER = await userRepo.doesUserExist({ mobile: data.mobile });
    if (ALREADY_EXISTING_USER) throw new AppError('Already existing user', StatusCodes.INTERNAL_SERVER_ERROR, SERVICE_LAYER);

    try {
        data.password = await hashPassword(data.password);
        const users = await userRepo.create(data)
        return users;
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`)
        throw new AppError('Cannot create user ', StatusCodes.INTERNAL_SERVER_ERROR, SERVICE_LAYER);
    }
}

async function authenticateUser(mobile, password) {
    try {
        const user = await userRepo.get({ mobile });
        if (!user) throw new AppError('User not found', StatusCodes.NOT_FOUND, SERVICE_LAYER);

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED, SERVICE_LAYER);
        const token = generateJwtToken(user);

        return {
            user,
            token
        };
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`);
        throw error;
    }
}


module.exports = {
    getUsers,
    addUser,
    authenticateUser
}