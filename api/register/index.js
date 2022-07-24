const express = require("express");
const registerRouter = express.Router();
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { users } = require("../../models");

registerRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400);

  // todo: check for dupes in the DB
  const duplicate = await users
    .findOne({
      where: {
        username,
      },
    })
    .catch((error) => console.log(error));

  if (duplicate)
    return res.status(409).json({ err: "Username already exists." });

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    await users.create({
      userName: username,
      password: hashedPwd,
    });

    res.status(201).json({ err: "Account successfully created!" });
  } catch (error) {
    res.status(500).json({ err: "Account not created!" });
  }
});

module.exports = registerRouter;
