const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controllers/members.controller");

memberRouter.route("/members").get(memberController.listMembers);

memberRouter.route("/member/:id").get(memberController.viewMember);

memberRouter
  .route("/member/:id/edit")
  .get(memberController.editMember)
  .put(memberController.putMember)
  .delete(memberController.deleteMember);

memberRouter.route("/member").post(memberController.createMember);

module.exports = memberRouter;
