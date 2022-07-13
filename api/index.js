var express = require("express");
var { getMembers } = require("./services/members");
var router = express.Router();

router.get("/members", async (req, res, next) => {
  try {
    res.json(await getMembers());
  } catch (err) {
    console.error(`Error while getting members `, err.message);
    next(err);
  }
});

module.exports = router;
