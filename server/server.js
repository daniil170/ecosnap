const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cors = require("cors");
const { HfInference } = require("@huggingface/inference");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- ДИАГНОСТИКА ---
const apiKey = process.env.HF_API_KEY ? process.env.HF_API_KEY.trim() : null;
console.log("--- STARTUP ---");
console.log(
  "HF_API_KEY:",
  apiKey ? "LOADED (Length: " + apiKey.length + ")" : "MISSING",
);
console.log("----------------");

// Инициализация SDK (передаем ключ строкой)
const hf = apiKey ? new HfInference(apiKey) : null;

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecosnap_avatars",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const uploadAvatar = multer({ storage });
const uploadImage = multer({ storage: multer.memoryStorage() });

// --- AI ENDPOINT ---
app.post("/api/analyze", uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    if (!hf) return res.status(500).json({ error: "AI not configured" });

    console.log("-> AI request sent...");

    const result = await hf.imageClassification({
      data: req.file.buffer,
      model: "google/vit-base-patch16-224",
    });

    const top = result.sort((a, b) => b.score - a.score)[0];
    const label = top.label.toLowerCase();

    let ecoPoints = 5;
    if (label.includes("plastic") || label.includes("bottle")) ecoPoints = 10;
    else if (label.includes("glass")) ecoPoints = 15;
    else if (label.includes("can") || label.includes("metal")) ecoPoints = 12;

    res.json({
      type: top.label,
      confidence: Math.round(top.score * 100) + "%",
      ecoPoints,
      advice: `Recycle ${top.label} properly ♻️`,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI failed", details: error.message });
  }
});

// --- AVATAR UPLOAD ---
app.post("/api/upload-avatar", uploadAvatar.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ url: req.file.path });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/", (req, res) => res.json({ status: "EcoSnap server running 🚀" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
