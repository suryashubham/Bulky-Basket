const { UserController } = require('../../controllers');
const { RequestValidationMiddleWare } = require('../../middlewares');

const express = require('express');
const router = express.Router();

router.get('/',RequestValidationMiddleWare.validateRequest,UserController.getAllUsers);
router.post('/signup',RequestValidationMiddleWare.validateUserCreationRequest,UserController.createNewUser);
router.post('/login',RequestValidationMiddleWare.validateLoginRequest,UserController.loginUser);

module.exports = router;