import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const DB_CONN_STRING = `mysql://${process.env.PLANETSCALE_DB_USERNAME}:${process.env.PLANETSCALE_DB_PASSWORD}@${process.env.PLANETSCALE_DB_HOST}/${process.env.PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`;

async function apis(req, res) {
  // const connection = await mysql.createConnection(
  //   `mysql://0x7slzpast8k:pscale_pw_ESx2t8hYHUwnHTfaeZx5mj4AyTXQ2_yevyplzdoM_FI@qfj0ueknrhqm.us-east-1.psdb.cloud/familytree?ssl={"rejectUnauthorized":true}`
  // );
  const connection = await mysql.createConnection(DB_CONN_STRING);
  if (req.method === "GET") {
    const query = "SELECT * FROM member";
    const [rows] = await connection
      .query(query)
      .catch((error) => console.log(error));
    res.json(rows);
  }
}

module.exports = apis;
