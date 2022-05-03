// import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
// const dotenv = require("dotenv");
// const mysql = require("mysql2/promise");
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
// const connection = await mysql.createConnection(process.env.DATABASE_URL);

async function apis(req, res) {
  const connection = await mysql.createConnection(
    `DATABASE_URL=mysql://${PLANETSCALE_DB_USERNAME}:${PLANETSCALE_DB_PASSWORD}@${PLANETSCALE_DB_HOST}/${PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`
  );
  if (req.method === "GET") {
    const query = "SELECT * FROM member";
    const [rows] = await connection
      .query(query)
      .catch((error) => console.log(error));
    res.json(rows);
  }
}

module.exports = apis;
