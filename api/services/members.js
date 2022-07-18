const db = require("./db");

const listAliases =
  "first_name as FirstName, middle_name as MiddleName, last_name as LastName, id";
const aliases =
  "first_name as FirstName, middle_name as MiddleName, last_name as LastName, suffix as Suffix, date_of_birth as DOB, date_of_death as DOD, marriage_status as Status, gender as Gender, fatherId as FatherId, motherId as MotherId, spouseId as SpouseId, id";

async function list() {
  const query = `SELECT ` + listAliases + ` FROM member`;
  const rows = await db.query(query).catch((error) => console.log(error));

  return rows;
}

async function getParents({ member }) {
  const { FatherId, MotherId } = member;
  const query =
    `SELECT ` + aliases + ` FROM member WHERE id IN (${FatherId}, ${MotherId})`;
  return db.query(query).catch((error) => console.log("parents: ", error));
}

async function getSiblings({ member }) {
  // get kids who have the same father as this member
  const { FatherId } = member;
  const query =
    `SELECT ` + aliases + ` FROM member WHERE fatherId = ${FatherId}`;
  return db.query(query).catch((error) => console.log("siblings: ", error));
}

async function getSpouse({ member }) {
  const { SpouseId } = member;
  const query = `SELECT ` + aliases + ` FROM member WHERE id = ${SpouseId}`;
  return db.query(query).catch((error) => console.log("spouse: ", error));
}

async function getChildren({ member }) {
  const { id, Gender } = member; // Gender: 1 = Female, 2 = Male
  const columnType = Gender === 2 ? "FatherId" : "MotherId";
  const query =
    `SELECT ` + aliases + ` FROM member WHERE ` + columnType + ` = ${id}`;
  return db.query(query).catch((error) => console.log("children: ", error));
}

async function get(id) {
  const query = `SELECT ` + aliases + ` FROM member WHERE id = ${id}`;
  const [row] = await db
    .query(query)
    .catch((error) => console.log("member: ", error));

  if (row.id) {
    const parents = getParents({ member: row });
    const siblings = getSiblings({ member: row });
    const spouse = getSpouse({ member: row });
    const children = getChildren({ member: row });

    return Promise.all([parents, siblings, spouse, children]).then(
      (promises) => {
        return {
          ...row,
          parents: [...promises[0]],
          siblings: [...promises[1]],
          spouse: promises[2],
          children: [...promises[3]],
        };
      }
    );
  }

  return null;
}

async function put({ data }) {
  const query = "UPDATE members SET ? WHERE id = ?";
  const [row] = await db
    .query(query, [data, data.id])
    .catch((error) => console.log(error));

  return row;
}

async function post({ data }) {
  // const query = "INSERT into members SET ?";
  const [row] = await db
    .query("INSERT into members SET ?", [data])
    .catch((error) => console.log(error));

  return row;
}

module.exports = {
  list,
  get,
  put,
  post,
};
