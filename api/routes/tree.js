const express = require('express');

const treeRouter = express.Router();
const treeController = require('../controllers/tree.controller');

treeRouter.route('/tree').get(treeController.list); // tree:id

module.exports = treeRouter;
