import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const DB_CONN_STRING = `mysql://${process.env.HG_DB_USERNAME}:${process.env.HG_DB_PASSWORD}@${process.env.HG_DB_HOST}/${process.env.HG_DB}?sslaccept=strict`;

async function members(req, res) {
  const connection = await mysql.createConnection(DB_CONN_STRING);

  if (req.method === "GET") {
    // father, first_name, gender, last_name, middle_name, mother, spouse, status, suffix, maiden_name
    const query =
      "SELECT first_name as FirstName, middle_name as MiddleName, last_name as LastName, id  FROM member";
    const [rows] = await connection
      .query(query)
      .catch((error) => console.log(error));
    res.json(rows);
  }
}

module.exports = members;
