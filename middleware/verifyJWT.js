require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ err: 'Not authorized; No auth header sent.' });
  }

  try {
    const tokenHeader = authHeader.split(' ')[1];
    const payload = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      ...req.user,
      userId: payload,
      // username: decoded.username
    };
  } catch (error) {
    res
      .status(403)
      .json({ err: 'Could not authorize User with auth header', error });
  }

  next();
};

module.exports = verifyJWT;
