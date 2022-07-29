const express = require("express");
const refreshRouter = express.Router();
const refreshController = require("../controllers/refresh.controller");

refreshRouter.route("/refresh_token").post(refreshController.refresh);

module.exports = refreshRouter;
