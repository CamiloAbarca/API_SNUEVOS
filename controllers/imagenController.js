const db = require("../db");

exports.create = (req, res) => {
  const { automovil_id, descripcion, es_principal } = req.body;
  if (!req.file)
    return res
      .status(400)
      .json({ error: 'Falta el archivo de imagen (campo "imagen")' });

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  const sql =
    "INSERT INTO ImagenAutomovil (automovil_id, url_imagen, descripcion, es_principal) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [
      automovil_id,
      fileUrl,
      descripcion || null,
      es_principal === "true" || es_principal === "1",
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, url_imagen: fileUrl });
    }
  );
};
