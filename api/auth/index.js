var express = require("express");
var authRouter = express.Router();

const SECRET = "R3ddfamilyTr33";

authRouter.post("/login", async (req, res, next) => {
  try {
    if (req.body.password === SECRET) {
      res.json({
        isAuthenticated: true,
      });
    } else {
      res.status(400).send({ isAuthenticated: false });
    }
  } catch (err) {
    console.error(`Error while getting members `, err.message);
    next(err);
  }
});

module.exports = authRouter;
