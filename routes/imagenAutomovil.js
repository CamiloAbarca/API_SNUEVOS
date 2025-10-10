const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imagenController = require('../controllers/imagenController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Solo imágenes permitidas'), false);
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

// listar imágenes (opcional query ?automovil_id=)
router.get('/', imagenController.getAll);

// obtener imagen por id
router.get('/:id', imagenController.getById);

// subir nueva imagen
router.post('/', upload.single('imagen'), imagenController.create);

module.exports = router;