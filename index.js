import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

import router from "./api/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(cors());
app.use("/api", router);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
