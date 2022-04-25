import {
  createMemberTableSQL,
  createEventTableSQL,
  dropMemberTableSQL,
  dropEventTableSQL,
  insertMemberSQL,
} from "./sql.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

import members from "./member.json";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const loadAndSaveData = async () => {
  try {
    //clear the existing records
    await connection.query(dropEventTableSQL);
    console.log("***dropped wand table***");

    await connection.query(dropMemberTableSQL);
    console.log("***dropped hp_character table***");

    await connection.query(createEventTableSQL);
    console.log("***created wand table***");

    await connection.query(createMemberTableSQL);
    console.log("***created hp_character table***");

    // save the characters
    // const characters = getCharacterDataToSave(data);
    // await connection.query(insertMemberSQL, [characters]);
    await connection.query(insertMemberSQL, members);
    console.log("***members saved***");
  } catch (err) {
    console.error(err);
  }
};

await loadAndSaveData();
process.exit(0);
