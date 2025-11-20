// server.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import linkRoutes from "./routes/linkRoutes.js";
import Link from "./models/Link.js";

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

/* MIDDLEWARE ------------------------------------- */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* HEALTH CHECK ----------------------------------- */
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

/* API ROUTES ------------------------------------- */
app.use("/api", linkRoutes);

/* REDIRECT ROUTE --------------------------------- */
app.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (!link) return res.status(404).send("Not Found");

    link.clickCount += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.targetUrl);
  } catch {
    return res.status(500).send("Server Error");
  }
});

/* START SERVER ----------------------------------- */
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
});
