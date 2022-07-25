require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("dead");
  // if (!authHeader) return res.status(401).json({ err: "Not authorized" });
  if (!authHeader) return res.redirect("/");
  console.log(authHeader);

  const tokenHeader = authHeader.split(" ")[1];

  jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ err: "Could not authorize User" });
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
