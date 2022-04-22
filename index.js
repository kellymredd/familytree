// const express = require("express");
// const path = require("path");
// const routes = require("./src/api/routes");

import express from "express";
import path from "path";
import dotenv from "dotenv";

import router from "./api/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api", router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
