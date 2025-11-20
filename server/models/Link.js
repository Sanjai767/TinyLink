// models/Link.js
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  targetUrl: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
