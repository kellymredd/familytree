module.exports = function resetRefreshToken(token) {
  res.cookie("jid", token, {
    httpOnly: true,
    // maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
