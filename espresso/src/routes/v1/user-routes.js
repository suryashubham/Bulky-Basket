
const { UserController } = require('../../controllers');
const { RequestValidationMiddleWare } = require('../../middlewares');

const express = require('express');
const router = express.Router();

router.get('/',RequestValidationMiddleWare.validateRequest,UserController.getAllUsers);

module.exports = router;