var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var authRouter = require("./api/auth");
var memberRouter = require("./api/members");

var PORT = process.env.PORT || 3001;
var app = express();

const db = require("./models");

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use("/api", authRouter);
app.use("/api", memberRouter);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// router.use(function (req, res, next) {
//   res.header("X-Frame-Options", "DENY");
//   return next();
// });

db.sequelize.sync().then((req) => {
  app.listen(PORT, () =>
    console.log("Family Tree app listening on port 3001!")
  );
});
