const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const logger = require("../utils/common/logger");

const SuccessResponse = require('../utils/common/success-response');
const ErrorResponse = require('../utils/common/error-response');
const setError = require('../utils/common/set-error');
const GenericError = require('../utils/errors/generic-error');
const { CONTROLLER_LAYER } = require('../utils/common/constants');


async function getAllUsers(req, res) {
    try {
        const usersList = await UserService.getUsers();
        SuccessResponse.data = usersList;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        logger.error(`${req.method} :Something went wrong in users ${error.apiLayer} layer:${error}`)
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function createNewUser(req, res) {
    try {
        const newUser = await UserService.addUser({
            firstName: req.body.firstName,
            mobile: req.body.mobile,
            role: req.body.role,
            password: req.body.password,
        })
        SuccessResponse.data = newUser;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        logger.error(`${req.method} : Something went wrong in users ${error.apiLayer} layer:${error}`)
        ErrorResponse.error = setError(error);
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function loginUser(req, res) {
    try {
        const { mobile, password } = req.body;
        const user = await UserService.authenticateUser(mobile, password);
        if (!user) throw new GenericError('Invalid credentials', StatusCodes.UNAUTHORIZED, CONTROLLER_LAYER);

        SuccessResponse.message = "Logged in successfully";
        SuccessResponse.data = { jwt:user?.jwt || "" };
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        logger.error(`${req.method} : Something went wrong in users ${error.apiLayer} layer:${error}`)
        ErrorResponse.error = setError(error);
        return res
            .status(error.statusCode || StatusCodes.UNAUTHORIZED)
            .json(ErrorResponse);
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    loginUser
};