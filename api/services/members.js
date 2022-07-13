const db = require("./db");

async function getMembers() {
  const query = `SELECT first_name as FirstName, middle_name as MiddleName, last_name as LastName, suffix as Suffix, date_of_birth as DOB, date_of_death as DOD, marriage_status as Status, gender as Gender, id FROM member`;
  const rows = await db.query(query).catch((error) => console.log(error));

  return rows;
}

module.exports = {
  getMembers,
};
