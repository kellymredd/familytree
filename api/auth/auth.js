require('dotenv').config();
const { sign } = require('jsonwebtoken');

const createAccessToken = (username) => sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: '3m',
});

const createRefreshToken = (username) => sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: '3m',
});

module.exports = { createAccessToken, createRefreshToken };
