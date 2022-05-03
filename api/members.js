import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const DB_CONN_STRING = `mysql://${process.env.PLANETSCALE_DB_USERNAME}:${process.env.PLANETSCALE_DB_PASSWORD}@${process.env.PLANETSCALE_DB_HOST}/${process.env.PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`;

async function apis(req, res) {
  const connection = await mysql.createConnection(DB_CONN_STRING);

  // find a better way than IF statements
  if (req.method === "GET") {
    // father, first_name, gender, last_name, middle_name, mother, spouse, status, suffix, maiden_name
    const query =
      "SELECT first_name as firstName, middle_name as middleName, last_name as lastName, id  FROM member";
    const [rows] = await connection
      .query(query)
      .catch((error) => console.log(error));
    res.json(rows);
  }
}

module.exports = apis;
