const db = require("../db");

const shortSelect = "firstName, middleName, lastName, suffix, id";

const colNames =
  "firstName, middleName, lastName, suffix, gender, status, spouseId, dateOfBirth, motherId"; //,dateOfDeath, maidenName, fatherId, id";

async function getParents({ member }) {
  const { fatherId, motherId } = member;
  const query = `SELECT ${shortSelect} FROM member WHERE id IN (${fatherId}, ${motherId})`;
  return db.query(query).catch((error) => console.log("parents: ", error));
}

async function getSiblings({ member }) {
  // get kids who have the same father as this member
  const { fatherId } = member;
  const query = `SELECT ${shortSelect} FROM member WHERE fatherId = ${fatherId}`;
  return db.query(query).catch((error) => console.log("siblings: ", error));
}

async function getSpouse({ member }) {
  const { spouseId } = member;
  const query = `SELECT ${shortSelect} FROM member WHERE id = ${spouseId}`;
  return db.query(query).catch((error) => console.log("spouse: ", error));
}

async function getChildren({ member }) {
  const { id, gender } = member; // gender: 1 = Female, 2 = Male
  const columnType = gender === 2 ? "fatherId" : "motherId";
  const query =
    `SELECT ${shortSelect} FROM member WHERE ` + columnType + ` = ${id}`;
  return db.query(query).catch((error) => console.log("children: ", error));
}

async function updateParentsOfSiblings({ id, gender }) {
  // We get the new Member's gender to determine if the
  // existing parent is mom or dad then update accordingly
  const target = gender.toLowerCase() === "female" ? "fatherId" : "motherId";
  const source = gender.toLowerCase() === "female" ? "motherId" : "fatherId";
  const query = "UPDATE member SET ? WHERE " + source + " = ?";
  const [row] = await db
    .query(query, [{ data, [target]: id }, data.id])
    .catch((error) => console.log(error));

  return row;
}

module.exports = {
  shortSelect,
  colNames,
  getParents,
  getChildren,
  getSiblings,
  getSpouse,
  updateParentsOfSiblings,
};
