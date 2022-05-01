import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
// import router from "./api/routes.js";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.json({ limit: "10mb", type: "application/json" }));

// parse application/json
app.use(bodyParser.json());
// app.use("/api/*", router);

app.get("/api/members", async () => {
  console.log("inside /members");
  const query = "SELECT * FROM member";
  const [rows] = await connection.query(query);
  res.send(rows);
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
