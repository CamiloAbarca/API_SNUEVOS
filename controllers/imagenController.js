const db = require('../db');
const path = require('path');

exports.create = (req, res) => {
  const { automovil_id, descripcion } = req.body;
  let es_principal = req.body.es_principal;

  if (!automovil_id) return res.status(400).json({ error: 'Falta automovil_id' });
  if (!req.file) return res.status(400).json({ error: 'Falta el archivo de imagen (campo "imagen")' });

  es_principal = (es_principal === 'true' || es_principal === '1' || es_principal === true) ? 1 : 0;

  // usa UPLOADS_BASE_URL si existe, si no usa host actual
  const baseUrl = (process.env.UPLOADS_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  const sql = 'INSERT INTO ImagenAutomovil (automovil_id, url_imagen, descripcion, es_principal) VALUES (?, ?, ?, ?)';
  db.query(sql, [automovil_id, fileUrl, descripcion || null, es_principal], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, url_imagen: fileUrl });
  });
};

exports.getAll = (req, res) => {
  console.log('GET /imagenes called, query=', req.query); // <-- debug
  const { automovil_id } = req.query;
  const sql = automovil_id
    ? 'SELECT * FROM ImagenAutomovil WHERE automovil_id = ? ORDER BY es_principal DESC, created_at DESC'
    : 'SELECT * FROM ImagenAutomovil ORDER BY created_at DESC';
  const params = automovil_id ? [automovil_id] : [];

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error('DB error getAll imagenes:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM ImagenAutomovil WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.json(rows[0]);
  });
};
