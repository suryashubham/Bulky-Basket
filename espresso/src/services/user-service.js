const { SERVICE_LAYER } = require('../utils/common/constants');
const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const { hashPassword } = require('../utils/crypt/passwordUtils')
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

module.exports = {
    getUsers,
    addUser
}