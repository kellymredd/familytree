// import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
// const dotenv = require("dotenv");
// const mysql = require("mysql2/promise");

dotenv.config();

// const connection = await mysql.createConnection(process.env.DATABASE_URL);

async function apis(req, res) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  if (req.method === "GET") {
    const query = "SELECT * FROM member";
    const [rows] = await connection.query(query);
    res.json(rows);
  }
}

module.exports = apis;
