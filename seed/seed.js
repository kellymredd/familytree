import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import {
  createMemberTableSQL,
  createEventTableSQL,
  dropMemberTableSQL,
  dropEventTableSQL,
  insertMemberSQL,
} from "./sql.js";

// dotenv.config();

// console.log(process.env.DATABASE_URL);
// const connection = await mysql.createConnection(process.env.DATABASE_URL);
const connection = await mysql.createConnection({
  user: "rgb8img8x4fq",
  database: "familytree",
  ssl: {
    cert: fs.readFileSync("../../certs/familytree.cer.pem"),
    key: fs.readFileSync("../../certs/familytree.key.pem"),
    // ca: fs.readFileSync("../../certs/ca-cert.cer.pem"),
  },
  //   user: "rgb8img8x4fq",
  //   password: "pscale_pw_wX41AFoB_blVpeYJhErEIYhuegmvC2y758y_OFTpePc",
  //   database: "familytree",
  //   host: "qfj0ueknrhqm.us-east-1.psdb.cloud",
  //   ssl: "Amazon RDS",
  //   connectTimeout: 6000,
});

const members = [
  {
    LastName: "White",
    Suffix: "",
    Spouse: "",
    Gender: 1,
    MiddleName: "",
    FirstName: "Stephanie",
    Status: 2,
    id: "moy8Jl1UUbxQeGSNAGro",
    Mother: "LlJeEzbeXa12FmJnxR7k",
    Father: "C9Y53rqS5l3xQMb4hwqW",
  },
  {
    DOB: "1974-01-31",
    Status: 1,
    LastName: "White",
    Spouse: "",
    id: "RAGWH7QrFJilQJatxK0v",
    MiddleName: "",
    Suffix: "",
    Gender: 2,
    FirstName: "Allen",
    Mother: "LlJeEzbeXa12FmJnxR7k",
    Father: "C9Y53rqS5l3xQMb4hwqW",
  },
  {
    Spouse: "C9Y53rqS5l3xQMb4hwqW",
    MaidenName: "Mays",
    Mother: "jOQsCk4xqXw3vIUPuuCd",
    Father: "f0ZwcYOZKonA6FOJpVcd",
    id: "LlJeEzbeXa12FmJnxR7k",
    FirstName: "Margaret",
    MiddleName: "",
    Suffix: "",
    Gender: 1,
    LastName: "White",
    Status: 2,
  },
  {
    LastName: "White",
    Gender: 2,
    Mother: null,
    Father: null,
    MiddleName: "",
    id: "C9Y53rqS5l3xQMb4hwqW",
    Status: 2,
    Spouse: "LlJeEzbeXa12FmJnxR7k",
    FirstName: "Donald",
    Suffix: "",
  },
  {
    Mother: null,
    Father: null,
    Status: 1,
    Suffix: "",
    FirstName: "Lyde",
    LastName: "Walton",
    MiddleName: "Claudine",
    id: "vc4vVEEtMBmwcUxxYsNi",
    MaidenName: "Smith",
    Gender: 1,
    Spouse: "bhoa1SQ9ZN2aeIytiiAn",
  },
  {
    Spouse: "vc4vVEEtMBmwcUxxYsNi",
    Suffix: "",
    Status: 1,
    Mother: null,
    Father: null,
    id: "bhoa1SQ9ZN2aeIytiiAn",
    DOB: "1870-03-14",
    MiddleName: "Forrest",
    Gender: 2,
    LastName: "Walton",
    FirstName: "Walter",
  },
  {
    Suffix: "",
    LastName: "Walton",
    Spouse: "",
    Mother: "vc4vVEEtMBmwcUxxYsNi",
    Father: "bhoa1SQ9ZN2aeIytiiAn",
    FirstName: "James",
    MiddleName: "Shields",
    Status: 1,
    Gender: 2,
    id: "IddYyWSNXDusEMHwfCKH",
  },
  {
    MiddleName: "Herbert",
    Spouse: "",
    Mother: "vc4vVEEtMBmwcUxxYsNi",
    Father: "bhoa1SQ9ZN2aeIytiiAn",
    Suffix: "",
    id: "45DBKZclqBHUqTt68SQx",
    Status: 1,
    LastName: "Walton",
    FirstName: "John",
    Gender: 2,
  },
  {
    Gender: 2,
    Spouse: "ZMd9cdx4TkNWsSAIT8tv",
    Status: 2,
    MiddleName: "",
    Mother: null,
    Father: null,
    Suffix: "",
    LastName: "Sweeney",
    FirstName: "Josh",
    id: "iZ5CaNsgtYMyUAC80QuK",
  },
  {
    MaidenName: "Redd",
    Mother: "UR3pSL21jxYXyR5Bn8QK",
    Father: "oVnChW8jFptnfJ9uJfUb",
    MiddleName: "",
    FirstName: "Jessica",
    Status: 2,
    Gender: 1,
    Suffix: "",
    Spouse: "iZ5CaNsgtYMyUAC80QuK",
    id: "ZMd9cdx4TkNWsSAIT8tv",
    LastName: "Sweeney",
  },
  {
    MiddleName: "Evelina",
    Suffix: "",
    Mother: null,
    Father: null,
    Status: 1,
    Gender: 1,
    id: "zGdKcMmy7MUDlvaTiN6r",
    LastName: "Shannon",
    FirstName: "Susie",
    Spouse: "Bu3LrzqjAoCvHp3vDfUx",
  },
  {
    Status: 1,
    Suffix: "",
    Gender: 2,
    id: "yoUNuPsDdXUAMQVTSq0w",
    Spouse: "6eOFtGu5q499RM4NESo1",
    FirstName: "Charles",
    Mother: null,
    Father: "auQUKDoGpZ44RsBHo4JW",
    MiddleName: "",
    LastName: "Redd",
  },
  {
    DOB: "2009-11-17",
    Suffix: "",
    Spouse: "",
    FirstName: "Madeline",
    LastName: "Redd",
    id: "xmjh02qRC3jOHkUjLLwC",
    Gender: 1,
    Mother: "j4Vg0gnDlv3pW00QZN2l",
    Father: "iBj0whMYjENinb43Yrei",
    MiddleName: "",
    Status: 2,
  },
  {
    Gender: 1,
    LastName: "Redd",
    DOB: "1984-01-03",
    Status: 2,
    Mother: "g3cDxdvZhaLlT1PlQ2tQ",
    Father: "W22Kg7FY2NCgnASLMzGk",
    id: "vsqVuxUv6iffp3vKbDBJ",
    MiddleName: "Hall",
    Spouse: "WGGHtvJAxx89np5RuJEj",
    FirstName: "Rebecca",
    Suffix: "",
    MaidenName: "Hall",
  },
  {
    id: "uQAOJ95cwlbUJMeie3rU",
    FirstName: "Luke",
    Gender: 2,
    LastName: "Redd",
    Mother: "j4Vg0gnDlv3pW00QZN2l",
    Father: "iBj0whMYjENinb43Yrei",
    Status: 2,
    Suffix: "",
    MiddleName: "Allen",
    DOB: "2006-02-21",
    Spouse: "",
  },
  {
    FirstName: "Collin",
    Suffix: "",
    LastName: "Redd",
    MiddleName: "Timothy",
    Mother: "WGGHtvJAxx89np5RuJEj",
    Father: "vsqVuxUv6iffp3vKbDBJ",
    Gender: 2,
    id: "sdYpTI6k61UMjgSDTEFH",
    DOB: "2016-02-03",
    Spouse: "",
    Status: 2,
  },
  {
    LastName: "Redd",
    FirstName: "Bobby",
    Status: 1,
    id: "pw9bbh53DVXGtneTdKAU",
    MiddleName: "Allen",
    DOB: "1927-01-31",
    Spouse: "MOaeUwenxHB1sFG1jmcC",
    Suffix: "",
    Mother: "6eOFtGu5q499RM4NESo1",
    Father: "yoUNuPsDdXUAMQVTSq0w",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    Gender: 2,
    DOD: "07/03/2016",
  },
  {
    Suffix: "",
    Spouse: "UR3pSL21jxYXyR5Bn8QK",
    id: "oVnChW8jFptnfJ9uJfUb",
    MiddleName: "Thomas",
    DOB: "01/31/1963",
    Status: 1,
    Gender: "",
    LastName: "Redd",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    FirstName: "John",
    Father: "pw9bbh53DVXGtneTdKAU",
    Mother: "MOaeUwenxHB1sFG1jmcC",
  },
  {
    Gender: 1,
    id: "j4Vg0gnDlv3pW00QZN2l",
    Mother: null,
    Father: null,
    FirstName: "Jennifer",
    MiddleName: "",
    MaidenName: "Coomer",
    Suffix: "",
    DOB: "1977-03-04",
    Status: 2,
    Spouse: "iBj0whMYjENinb43Yrei",
    LastName: "Redd",
  },
  {
    Spouse: "",
    DOB: "2012-06-12",
    Mother: "j4Vg0gnDlv3pW00QZN2l",
    Father: "iBj0whMYjENinb43Yrei",
    MiddleName: "",
    Gender: 2,
    FirstName: "Deacon",
    LastName: "Redd",
    id: "ikBDzBqq4UdD4f19LF1u",
    Suffix: "",
    Status: 2,
  },
  {
    id: "iBj0whMYjENinb43Yrei",
    Spouse: "j4Vg0gnDlv3pW00QZN2l",
    Father: "pw9bbh53DVXGtneTdKAU",
    Mother: "MOaeUwenxHB1sFG1jmcC",
    MiddleName: "Charles",
    LastName: "Redd",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    Suffix: "",
    Status: 2,
    Gender: 2,
    DOB: "02/15/1975",
    FirstName: "Kevin",
  },
  {
    Status: 1,
    FirstName: "George",
    Suffix: "",
    Gender: 2,
    id: "auQUKDoGpZ44RsBHo4JW",
    Spouse: "",
    LastName: "Redd",
    Mother: null,
    Father: null,
    MiddleName: "",
  },
  {
    Spouse: "vsqVuxUv6iffp3vKbDBJ",
    Status: 2,
    id: "WGGHtvJAxx89np5RuJEj",
    DOB: "02/15/1975",
    LastName: "Redd",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    Gender: 2,
    Suffix: "",
    MiddleName: "Mays",
    FirstName: "Kelly",
    Mother: "pw9bbh53DVXGtneTdKAU",
    Father: "MOaeUwenxHB1sFG1jmcC",
  },
  {
    Suffix: "",
    MiddleName: "",
    id: "UR3pSL21jxYXyR5Bn8QK",
    FirstName: "Martha",
    Status: 2,
    Spouse: "oVnChW8jFptnfJ9uJfUb",
    Mother: null,
    Father: null,
    Gender: 1,
    LastName: "Redd",
  },
  {
    Spouse: "pw9bbh53DVXGtneTdKAU",
    Suffix: "",
    Gender: 1,
    Status: 2,
    MaidenName: "Mays",
    Mother: "jOQsCk4xqXw3vIUPuuCd",
    Father: "f0ZwcYOZKonA6FOJpVcd",
    DOB: "1938-06-28",
    LastName: "Redd",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    FirstName: "Sue",
    id: "MOaeUwenxHB1sFG1jmcC",
    MiddleName: "Walton",
  },
  {
    Suffix: "",
    Gender: 2,
    Mother: "WGGHtvJAxx89np5RuJEj",
    Father: "vsqVuxUv6iffp3vKbDBJ",
    id: "8rESAJYpCuNcsmZGImVM",
    FirstName: "Ethan",
    MiddleName: "Thomas",
    Spouse: "",
    DOB: "2013-12-12",
    Status: 2,
    LastName: "Redd",
  },
  {
    LastName: "Redd",
    Suffix: "",
    Gender: 2,
    Father: "pw9bbh53DVXGtneTdKAU",
    Mother: "MOaeUwenxHB1sFG1jmcC",
    BranchId: "4e9d7e8b-3c55-4e9c-8fb1-c099d8559974",
    DOB: "1959-08-20",
    Spouse: "",
    FirstName: "Michael",
    id: "7Dwpz4Z8RH38cPhVQEQF",
    Status: 2,
    MiddleName: "Allen",
  },
  {
    Suffix: "",
    LastName: "Redd",
    Gender: 1,
    MiddleName: "",
    FirstName: "Julie",
    id: "6eOFtGu5q499RM4NESo1",
    Status: 1,
    Mother: null,
    Father: null,
    Spouse: "yoUNuPsDdXUAMQVTSq0w",
  },
  {
    FirstName: "Claudine",
    Gender: 1,
    LastName: "Mays",
    MaidenName: "Walton",
    Mother: "vc4vVEEtMBmwcUxxYsNi",
    Father: "bhoa1SQ9ZN2aeIytiiAn",
    MiddleName: "",
    Suffix: "",
    id: "jOQsCk4xqXw3vIUPuuCd",
    Spouse: "f0ZwcYOZKonA6FOJpVcd",
    Status: 1,
  },
  {
    Mother: "zGdKcMmy7MUDlvaTiN6r",
    Father: "Bu3LrzqjAoCvHp3vDfUx",
    Suffix: "",
    Status: 1,
    FirstName: "Anna",
    Gender: "",
    id: "hSH38BgVChwQfgw7vajk",
    LastName: "Mays",
    Spouse: "",
    MiddleName: "Estelle",
  },
  {
    Status: 1,
    MiddleName: "Fredrick",
    Gender: 2,
    id: "f0ZwcYOZKonA6FOJpVcd",
    LastName: "Mays",
    FirstName: "Jesse",
    Mother: "zGdKcMmy7MUDlvaTiN6r",
    Father: "Bu3LrzqjAoCvHp3vDfUx",
    Suffix: "",
    Spouse: "jOQsCk4xqXw3vIUPuuCd",
  },
  {
    Status: 1,
    Gender: 2,
    id: "dxj0Rfo7KhPA44t61sMc",
    MiddleName: "Richard Shannon",
    LastName: "Mays",
    Mother: "zGdKcMmy7MUDlvaTiN6r",
    Father: "Bu3LrzqjAoCvHp3vDfUx",
    FirstName: "John",
    Spouse: "",
    Suffix: "",
  },
  {
    MiddleName: "",
    Spouse: "",
    Status: 1,
    id: "a7KvM87MKDPx2FcIv1rO",
    Gender: 1,
    LastName: "Mays",
    Mother: "zGdKcMmy7MUDlvaTiN6r",
    Father: "Bu3LrzqjAoCvHp3vDfUx",
    FirstName: "Rachel",
    Suffix: "",
  },
  {
    MiddleName: "Crowder",
    id: "Bu3LrzqjAoCvHp3vDfUx",
    LastName: "Mays",
    Status: 1,
    DOB: "1870-03-20",
    FirstName: "John",
    Mother: null,
    Father: null,
    Spouse: "zGdKcMmy7MUDlvaTiN6r",
    DOD: "1959-09-23",
    Suffix: "",
    Gender: 2,
  },
  {
    Gender: 1,
    Spouse: "MkzMjhv2n3jFBemVZ7GL",
    LastName: "King",
    MiddleName: "",
    BranchId: "31211508-5051-42f8-b44c-e598006c42d8",
    Status: 2,
    Suffix: "",
    DOB: "1940-08-08",
    MaidenName: "Mays",
    FirstName: "Lyla",
    id: "e8kJbaqbPenXhIguQZeo",
    Mother: "jOQsCk4xqXw3vIUPuuCd",
    Father: "f0ZwcYOZKonA6FOJpVcd",
  },
  {
    Spouse: "e8kJbaqbPenXhIguQZeo",
    Mother: null,
    Father: null,
    FirstName: "Robert",
    LastName: "King",
    Gender: 2,
    BranchId: "31211508-5051-42f8-b44c-e598006c42d8",
    Suffix: "",
    Status: 2,
    MiddleName: "",
    id: "MkzMjhv2n3jFBemVZ7GL",
  },
  {
    FirstName: "Joyce",
    Gender: 1,
    id: "g3cDxdvZhaLlT1PlQ2tQ",
    Status: 2,
    Suffix: "",
    Spouse: "W22Kg7FY2NCgnASLMzGk",
    Mother: null,
    Father: null,
    LastName: "Hall",
    MiddleName: "",
  },
  {
    Spouse: "g3cDxdvZhaLlT1PlQ2tQ",
    Suffix: "",
    MiddleName: "",
    Status: 2,
    Gender: 2,
    LastName: "Hall",
    FirstName: "Timothy",
    Mother: null,
    Father: null,
    id: "W22Kg7FY2NCgnASLMzGk",
  },
  {
    Suffix: "",
    Gender: 1,
    Status: 1,
    MiddleName: "",
    FirstName: "Francis",
    id: "cL9mtivtWOfEBjd4Pf04",
    MaidenName: "Walton",
    LastName: "Blankenship",
    Mother: "vc4vVEEtMBmwcUxxYsNi",
    Father: "bhoa1SQ9ZN2aeIytiiAn",
    Spouse: "",
  },
  {
    Gender: 1,
    BranchId: "31211508-5051-42f8-b44c-e598006c42d8",
    MiddleName: "",
    MaidenName: "King",
    Mother: "e8kJbaqbPenXhIguQZeo",
    Father: "MkzMjhv2n3jFBemVZ7GL",
    Spouse: "Bh0aQ4vq3TPeQ5tFCkjF",
    FirstName: "Terri",
    LastName: "Baxter",
    Suffix: "",
    Status: 2,
    id: "cOhsFdkBVb0i2CxKcpeJ",
  },
  {
    Status: 2,
    Spouse: "cOhsFdkBVb0i2CxKcpeJ",
    Mother: null,
    Father: null,
    LastName: "Baxter",
    FirstName: "Terri",
    Gender: 2,
    Suffix: "",
    id: "Bh0aQ4vq3TPeQ5tFCkjF",
    MiddleName: "",
  },
  {
    LastName: "Alfred",
    Gender: 1,
    Status: 2,
    id: "iAk4IOSBipDAKQSln3my",
    Suffix: "",
    MiddleName: "",
    Spouse: "71w3lt1gnWJ1xpBFpIfe",
    MaidenName: "King",
    BranchId: "31211508-5051-42f8-b44c-e598006c42d8",
    Mother: "e8kJbaqbPenXhIguQZeo",
    Father: "MkzMjhv2n3jFBemVZ7GL",
    FirstName: "Laurie",
  },
  {
    Status: 2,
    LastName: "Alfred",
    Suffix: "",
    FirstName: "Mark",
    Spouse: "iAk4IOSBipDAKQSln3my",
    id: "71w3lt1gnWJ1xpBFpIfe",
    Mother: null,
    Father: null,
    Gender: 2,
    MiddleName: "",
  },
];

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

// await loadAndSaveData();
// process.exit(0);
