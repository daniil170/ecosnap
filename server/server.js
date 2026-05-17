const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const sharp = require("sharp"); // Оптимизация: сжатие тяжелых изображений перед отправкой в AI
const rateLimit = require("express-rate-limit"); // Оптимизация: защита бесплатного лимита API от спама
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- ЗАЩИТА БЮДЖЕТА / ЛИМИТОВ (RATE LIMITING) ---
// Ограничиваем количество запросов к AI (максимум 10 запросов в минуту с одного IP)
const analyzeLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 10,
  message: {
    error: "Слишком много запросов на анализ. Пожалуйста, подождите минуту.",
  },
});

// --- CONFIG GEMINI ---
const apiKey = process.env.GEMINI_API_KEY?.trim();
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.1, // Минимальная температура для стабильного JSON
  },
  // Идеальный промпт для экономии: просим возвращать только базовый английский и ключи
  systemInstruction: `Act as an environmental expert. Identify the object in the image. 
  Focus on waste sorting. If it looks like crumpled paper, it is "paper", not a "decoration".
  Return ONLY a JSON object:
  {
    "object": "name of object in English (e.g. plastic bottle, apple core)", 
    "material": "paper" | "plastic" | "glass" | "metal" | "other",
    "recyclable": boolean,
    "confidence": number
  }`,
});

// Данные о баках теперь тоже хранят ключи для перевода, а не жесткий русский текст
const getBinDetails = (material) => {
  const bins = {
    paper: { color: "blue", labelKey: "bins.paper", icon: "blue" },
    plastic: { color: "yellow", labelKey: "bins.plastic", icon: "yellow" },
    glass: { color: "green", labelKey: "bins.glass", icon: "green" },
    metal: { color: "red", labelKey: "bins.metal", icon: "red" },
    other: { color: "gray", labelKey: "bins.other", icon: "gray" },
  };
  return bins[material] || bins.other;
};

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
  },
});

// --- MULTER CONFIG ---
const uploadAvatar = multer({ storage });

// Ограничиваем максимальный размер загружаемого файла на уровне multer до 7 МБ
// Перемещено вверх, чтобы избежать ошибок инициализации при вызове эндпоинта
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 7 * 1024 * 1024 },
});

// ============================
// 🔥 AI ANALYZE ENDPOINT (CLEAN & OPTIMIZED)
// ============================
app.post(
  "/api/analyze",
  analyzeLimiter,
  uploadImage.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "No image provided" });
      if (!apiKey)
        return res.status(500).json({ error: "Gemini API key missing" });

      console.log("-> Compressing image...");
      const compressedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 75 })
        .toBuffer();

      const imagePart = {
        inlineData: {
          data: compressedBuffer.toString("base64"),
          mimeType: "image/jpeg",
        },
      };

      console.log("-> Requesting Gemini...");
      const result = await model.generateContent([
        "Analyze this item.",
        imagePart,
      ]);
      const aiResponse = JSON.parse(result.response.text());

      const bin = getBinDetails(aiResponse.material);

      console.log(`-> Detected: ${aiResponse.object} (${aiResponse.material})`);

      // Отправляем на фронтенд чистые данные. Никакого хардкодного русского языка!
      res.json({
        type: aiResponse.object, // Например: "Plastic bottle"
        material: aiResponse.material, // "plastic"
        recyclable: aiResponse.recyclable, // true
        category: bin, // { color: "yellow", labelKey: "bins.plastic", ... }
        ecoPoints: aiResponse.recyclable ? 20 : 5,
        ozone: 15,
      });
    } catch (error) {
      console.error("AI ERROR:", error);
      res.status(500).json({ error: "Analysis failed" });
    }
  },
);

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
