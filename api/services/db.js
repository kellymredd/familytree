const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  // const connection = await mysql.createConnection(process.env.JAWSDB_MARIA_URL);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
