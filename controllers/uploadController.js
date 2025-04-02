import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Necesario para __dirname con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 📁 Asegurar que la carpeta uploads exista
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 🧠 Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato no permitido'), false);
  }
};

export const upload = multer({ storage, fileFilter });

export const uploadImage = (req, res) => {
  console.log('req.file', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('imagen url', imageUrl);

  // Aquí puedes guardar el nombre en la base de datos si lo deseas

  res.json({ filename: req.file.filename, url: imageUrl });
};
