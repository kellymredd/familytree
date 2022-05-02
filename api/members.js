// import express from "express";
// import dotenv from "dotenv";
// import mysql from "mysql2/promise";
// const dotenv = require("dotenv");
import { PSDB } from "planetscale-node";
// const mysql = require("mysql2/promise");

// dotenv.config();

// const router = express.Router();
// const connection = await mysql.createConnection(process.env.DATABASE_URL);

const conn = new PSDB("familytree");

async function apis(req, res) {
  // const connection = await mysql
  //   .createConnection(process.env.DATABASE_URL)
  //   .catch((err) => console.log(err));

  if (req.method === "GET") {
    // return res.json([{ id: 12312312, FirstName: "Kelly" }]);
    const query = "SELECT * FROM member";
    const [rows] = await conn.query(query);
    res.json(rows);
  }
}

module.exports = apis;
