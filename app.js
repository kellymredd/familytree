var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const cookieParser = require("cookie-parser");
const registerRouter = require("./api/routes/register");
const loginRouter = require("./api/routes/login");
const memberRouter = require("./api/routes/members");
const eventRouter = require("./api/routes/events");
const refreshRouter = require("./api/routes/refresh");
const verifyJWT = require("./middleware/verifyJWT");

var PORT = process.env.PORT || 3001;
var app = express();

const db = require("./models");

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(cookieParser());
app.disable("x-powered-by");
// app.use(compression()); ???

app.use("/api", refreshRouter);
app.use("/api", registerRouter);
app.use("/api", loginRouter);

// app.use(verifyJWT); // can't blanket protect or all react routes will barf
app.use("/api", verifyJWT, memberRouter); // protect apis only rn
app.use("/api", verifyJWT, eventRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

db.sequelize.sync().then((req) => {
  app.listen(PORT, () =>
    console.log("Family Tree app listening on port 3001!")
  );
});
