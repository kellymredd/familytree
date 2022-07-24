const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

const SECRET = "R3ddfamilyTr33";

authRouter.post("/login", async (req, res, next) => {
  // Authenticate first
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and Password are required" });
  }

  // I think the tutorial is creating/signing up a new user (not logging in)
  // todo: check for dupes in the DB

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store the new user
    // post to db
  } catch (error) {
    res.send(500).json({ message: error.msg });
  }

  // User is now authenticated so now we need to authenticate and serialize user with json web tokens
  // const username = req.body.username;
  const user = { user: username };

  const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET);

  res.json({ accessToken });

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
