const { StatusCodes } = require('http-status-codes');
const AppError  = require('../utils/errors/app-error.js');

const logger  = require('../utils/common/logger');
const { UserRepository } = require('../repositories');


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
    /** TODO: write logic for cecking the duplicate user creation */
    /** PROPER ERROR PROPAGATION FROM LAYERS TO USER */
    // const ALREADY_EXISTING_USER = await alreadyExistingUser(data);
    // if (ALREADY_EXISTING_USER) throw new AppError('Already existing user', StatusCodes.INTERNAL_SERVER_ERROR);
    
    try {
        const users = await userRepo.create(data)
        return users;
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`)
        throw new AppError('Cannot create user ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserWithContact(data) {
    try {
        const users = await userRepo.getByPrimaryContact(data)
        return users;
    } catch (error) {
        logger.error(`Something went wrong in user  service layer:${error}`)
        throw new AppError('Cannot fetch data of user with the given contact', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function alreadyExistingUser(data) {
    const USER = await getUserWithContact(data.mobile);
    return USER;
}

module.exports = {
    getUsers,
    addUser
}