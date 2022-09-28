const express = require('express');

const registerRouter = express.Router();
const registerController = require('../controllers/register.controller');

registerRouter.route('/register').post(registerController.register);

module.exports = registerRouter;
