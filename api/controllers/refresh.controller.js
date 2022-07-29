require("dotenv").config();

const { verify } = require("jsonwebtoken");
const { createRefreshToken } = require("../auth/auth");
const resetRefreshToken = require("../auth/resetRefreshToken");
// const { users } = require("../../models");

const refresh = async (req, res, next) => {
  const token = req.cookies.jid;
  if (!token) {
    return send({ ok: false, accesToken: "" });
  }

  let payload = null;
  try {
    // need jwt token (move to jwtfile maybe?)
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    // should we be doing res.status()??
    res.status(401).json({ error: "Could not verify token." });
  }

  if (payload) {
    // Refresh the `refreshToken`
    resetRefreshToken(createRefreshToken(payload.username));

    // Refresh Users `accessToken`
    res.status(200).json({ accesToken: createRefreshToken(payload.username) });
    // return send({ ok: true, accesToken: createRefreshToken(payload.username) });
  }

  // do we REALLY need to do this?
  //   const user = await users
  //     .findOne({
  //       where: {
  //         userName: payload.username,
  //       },
  //     })
  //     .catch((error) => console.log(error));

  //   if (!user) {
  //     return send({ ok: false, accesToken: "" });
  //   } else {
  //     return send({ ok: true, accesToken: createRefreshToken(payload.username) });
  //   }
};

module.exports = { refresh };
