require('dotenv').config();

const { compare } = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../auth/auth');
const resetRefreshToken = require('../auth/resetRefreshToken');
const { users } = require('../../models');

const login = async (req, res, next) => {
  // Authenticate first
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ err: 'Username and Password are required' });
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

  if (!foundUser) return res.status(401).json({ error: 'Could not find User.' });

  const valid = await compare(password, foundUser.password);

  if (!valid) res.status(401).json({ error: 'Bad password' });

  if (valid) {
    // todo: needto save refresh token in the DB with current User (how?)
    // think DB needs a refreshToken column
    // res.status(200);

    // Refresh the `refreshToken` (http cookie)
    resetRefreshToken(createRefreshToken(foundUser.userName));
    // return accessToken to UI
    res.json({ accessToken: createAccessToken(foundUser.userName) });
  }
};

module.exports = { login };
