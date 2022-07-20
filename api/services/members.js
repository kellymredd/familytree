const db = require("./db");
const {
  shortSelect,
  colNames,
  getParents,
  getChildren,
  getSiblings,
  getSpouse,
  updateParentColOfSiblings,
} = require("./helpers/members");

async function list() {
  const query = `SELECT ${shortSelect} FROM member`;
  const rows = await db.query(query).catch((error) => console.log(error));

  return rows;
}

async function get(id) {
  const query = `SELECT * FROM member WHERE id = ${id}`;
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

  return row; // if we make it this far would `row` have the error message in it?
}

async function put({ data }) {
  const query = "UPDATE member SET ? WHERE id = ?";
  const [row] = await db
    .query(query, [data, data.id])
    .catch((error) => console.log(error));

  return row;
}

async function post({ data }) {
  // console.log(data);
  // remove items that don't go into db
  const { memberType, contextMember, type, id, parents, ...rest } = data;
  console.log(rest);
  // Create new member first, then update other members accordingly
  const query = `INSERT INTO member (${colNames}) VALUES (?,?,?,?,?,?,?,?,?)`;
  // const query = "INSERT INTO member SET ?";
  const [row] = await db
    .query(query, [rest])
    .catch((error) => console.log("INSERT ERROR: ", error));

  if (row.id) {
    const { id, gender } = row;

    if (memberType.toLowerCase() === "spouse") {
      await put({
        data: { id: contextMember.id, spouseId: id },
      });
    } else if (memberType.toLowerCase() === "parents") {
      // if 0 parents we know they have no siblings yet
      //(ie: business rule says you can't add siblings w/o at least 1 parent)
      const parentColumn = gender === 2 ? "fatherId" : "motherId";
      if (!contextMember.parents.length) {
        // we are creating a new parent in the context of one of their existing children
        // so update this existing child's db record with their father/mother id
        await put({
          data: { id: contextMember.id, [parentColumn]: id },
        });
      } else {
        // update all contextMember's siblings db records with their father/mother id
        await updateParentColOfSiblings({ id, gender });
      }

      // if contextMember only has 1 parent (ie, a child),
      // then update that 1 parent's db record with a spouse
      if (contextMember?.parents?.length === 1) {
        await put({
          data: { id: contextMember.id, spouseId: id },
        });
      }
    }

    return row;
  }

  return row;
}

module.exports = {
  list,
  get,
  put,
  post,
};
