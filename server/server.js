const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config({ path: './server/.env' });

const app = express();

// Разрешаем CORS, чтобы фронтенд мог достучаться до сервера
app.use(cors());
app.use(express.json());

// Конфиг Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Настройка хранилища: авто-обрезка и папка
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecosnap_avatars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

const upload = multer({ storage: storage });

// Эндпоинт для загрузки
app.post('/api/upload-avatar', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }
    // Отправляем обратно только безопасный URL
    res.json({ url: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера при загрузке' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));