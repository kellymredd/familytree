require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../../models");

const login = async (req, res, next) => {
  console.log(req.body);
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

  if (!foundUser)
    return res.status(401).json({ error: "Could not find a Username." });

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWT tokens here
    const accessToken = jwt.sign(
      { username: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // todo: needto save refresh token in the DB with current User (how?)
    // think DB needs a refreshToken column
    // res.status(200);

    // send http cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day\
    // return accessToken to UI
    res.json({ accessToken });
  } else {
    res.status(401);
  }
};

module.exports = { login };
