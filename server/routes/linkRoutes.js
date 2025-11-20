// routes/linkRoutes.mjs
import express from "express";
import { nanoid } from "nanoid";
import Link from "../models/Link.js";

const router = express.Router();

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/* CREATE LINK -------------------------------------- */
router.post("/links", async (req, res) => {
  try {
    const { targetUrl, customCode } = req.body;

    if (!isValidUrl(targetUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = customCode || nanoid(6);

    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const link = await Link.create({ code, targetUrl });
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* LIST ALL LINKS ----------------------------------- */
router.get("/links", async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
});

/* GET STATS for ONE LINK ---------------------------- */
router.get("/links/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });

  if (!link) return res.status(404).json({ error: "Not found" });

  res.json(link);
});

/* DELETE LINK -------------------------------------- */
router.delete("/links/:code", async (req, res) => {
  const link = await Link.findOneAndDelete({ code: req.params.code });

  if (!link) return res.status(404).json({ error: "Not found" });

  res.json({ success: true });
});

export default router;
