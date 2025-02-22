const { setErrorResponse, setSuccessResponse } = require('../utils/common/setResponseConfig');
const { CONTROLLER_LAYER } = require('../utils/common/constants');
const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');

const ErrorResponse = require('../utils/common/error-response');
const GenericError = require('../utils/errors/generic-error');

const logger = require("../utils/common/logger");


async function getAllUsers(req, res) {
    try {
        const usersList = await UserService.getUsers();
        const responseData = setSuccessResponse("Users fetched successfully", usersList);
        return res
            .status(StatusCodes.OK)
            .json(responseData);
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
        const responseData = setSuccessResponse("User created successfully", newUser);
        return res
            .status(StatusCodes.OK)
            .json(responseData);
    } catch (error) {
        logger.error(`${req.method} : Something went wrong in users ${error.apiLayer} layer:${error}`)
        ErrorResponse.error = setErrorResponse(error);
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function loginUser(req, res) {
    try {
        const { mobile, password } = req.body;
        const { user, token } = await UserService.authenticateUser(mobile, password);
        if (!user) throw new GenericError('Invalid credentials', StatusCodes.UNAUTHORIZED, CONTROLLER_LAYER);
        //store user in a session
        req.session.userId = user.id;
        req.session.mobile = user.mobile;
        //set cookie
        res.cookie('token', token, { httpOnly: true });
        const responseData = setSuccessResponse("Logged in successfully", { jwt: token ?? "" });
        return res
            .status(StatusCodes.OK)
            .json(responseData);
    } catch (error) {
        logger.error(`${req.method} : Something went wrong in users ${error.apiLayer} layer:${error}`)
        ErrorResponse.error = setErrorResponse(error);
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