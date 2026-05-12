const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIG ---
const apiKey = process.env.GEMINI_API_KEY?.trim();
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// --- CLOUDINARY ---
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
  },
});

const uploadAvatar = multer({ storage });
const uploadImage = multer({ storage: multer.memoryStorage() });

const getBinDetails = (material) => {
  const bins = {
    paper: { color: "Синий", label: "Бумага", icon: "blue" },
    plastic: { color: "Желтый", label: "Пластик", icon: "yellow" },
    glass: { color: "Зеленый", label: "Стекло", icon: "green" },
    metal: { color: "Красный", label: "Металл", icon: "red" },
    other: { color: "Серый", label: "Смешанные отходы", icon: "gray" },
  };
  return bins[material] || bins.other;
};

// ============================
// 🔥 AI ANALYZE ENDPOINT
// ============================
app.post("/api/analyze", uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    if (!apiKey)
      return res.status(500).json({ error: "Gemini API key missing" });

    console.log("-> Analyzing item...");

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `Act as an environmental expert. Identify the object in the image. 
    Focus on waste sorting. If it looks like crumpled paper, it is "paper", not a "decoration".
    Return ONLY a JSON object:
    {
      "object": "name in Russian",
      "material": "paper" | "plastic" | "glass" | "metal" | "other",
      "recyclable": boolean,
      "confidence": number,
      "advice": "short sorting advice in Russian"
    }`;

    const result = await model.generateContent([prompt, imagePart]);
    const aiResponse = JSON.parse(result.response.text());

    const bin = getBinDetails(aiResponse.material);

    console.log(`-> Detected: ${aiResponse.object} (${aiResponse.material})`);

    res.json({
      type: aiResponse.object,
      recyclable: aiResponse.recyclable,
      advice: aiResponse.advice,
      material: aiResponse.material,
      category: bin, // Данные для фронтенда о цвете бака
      ecoPoints: aiResponse.recyclable ? 20 : 5,
      ozone: 15,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// ============================
// 🧑‍💻 UPLOAD AVATAR
// ============================
app.post("/api/upload-avatar", uploadAvatar.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ url: req.file.path });
  } catch (e) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/", (req, res) => res.json({ status: "EcoSnap Server Online 🚀" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
