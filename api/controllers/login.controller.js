require("dotenv").config();

const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { users } = require("../../models");

const login = async (req, res, next) => {
  // Authenticate first
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ err: "Username and Password are required" });
  }

  // Find User
  // Check for dupes in the DB
  const foundUser = await users
    .findOne({
      where: {
        userName: username,
      },
    })
    .catch((error) => console.log(error));

  if (!foundUser) res.status(401).json({ error: "Could not find User." });

  const valid = await compare(password, foundUser.password);

  if (!valid) res.status(401).json({ error: "Bad password" });

  if (valid) {
    // create JWT tokens here
    const accessToken = sign(
      { username: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" } // <- for testing, change to 15m for rlz
    );
    const refreshToken = sign(
      { username: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    // todo: needto save refresh token in the DB with current User (how?)
    // think DB needs a refreshToken column
    // res.status(200);

    // send http cookie
    res.cookie("jid", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day
    // return accessToken to UI
    res.json({ accessToken });
  }
};

module.exports = { login };
