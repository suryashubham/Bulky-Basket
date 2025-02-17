const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors/app-error.js');

const { logger } = require('../utils/common/logger');
const { UserRepository } = require('../repositories');


const userRepo = new UserRepository();

async function getUsers() {
    try {
        const seekers = await userRepo.getAll();
        return seekers;
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`)
        throw new AppError('Cannot fetch data of all the users', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function addUser(data) {
    const ALREADY_EXISTING_USER = await alreadyExistingUser(data);
    if (ALREADY_EXISTING_USER) throw new AppError('Already existing user', StatusCodes.INTERNAL_SERVER_ERROR);


    try {
        const seekers = await userRepo.create(data)
        return seekers;
    } catch (error) {
        logger.error(`Something went wrong in user service layer:${error}`)
        throw new AppError('Cannot create user ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// async function getUserWithContact(data) {
//     try {
//         const seekers = await userRepo.getByPrimaryContact(data)
//         return seekers;
//     } catch (error) {
//         logger.error(`Something went wrong in user  service layer:${error}`)
//         throw new AppError('Cannot fetch data of all the users', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

async function alreadyExistingUser(data) {
    const USER = await getUserWithContact(data.primary_contact)
    return USER;
}

module.exports = {
    getUsers,
    addUser
}