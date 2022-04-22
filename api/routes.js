import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import res from "express/lib/response";

dotenv.config();

const router = express.Router();
const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Event routes
router.get("/event/:id", () => "A single Event");

router.get("/events/", () => "All Events");

router.post("/event", () => "Saved an Event");

router.put("/event/:id", () => "Updated an Event");

router.delete("/event/:id", () => "Deleted an Event");

// Family member routes
router.get("/member/:id", async (req, res) => {
  const query = "SELECT * FROM familyTree";
  const [rows] = await connection.query(query);
  res.json(rows);
});

router.get("/members", () => res.json([]));

router.post("/member", () => "Saved an member");

router.put("/member/:id", () => "Updated an member");

router.delete("/member/:id", () => "Deleted an member");

export default router;
