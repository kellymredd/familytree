const bcrypt = require("bcrypt");

const { users } = require("../../models");

const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ err: "Username and Password are required." });

  // Check for dupes in the DB
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
    // encrypting the password
    const hashedPwd = await bcrypt.hash(password, 10);
    await users.create({
      userName: username,
      password: hashedPwd,
    });

    res.status(201).json({ message: "Account successfully created!" });
  } catch (error) {
    res.status(500).json({ err: "Failed to create Account." });
  }
};

module.exports = { register };
