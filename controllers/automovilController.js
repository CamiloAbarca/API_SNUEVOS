const db = require("../db");
const fs = require('fs').promises;
const path = require('path');

exports.createAutomovil = (req, res) => {
  const {
    marca,
    modelo,
    ano,
    km,
    combustible,
    transmision,
    carroceria,
    descripcion,
  } = req.body;
  db.query(
    "INSERT INTO Automovil (marca, modelo, ano, km, combustible, transmision, carroceria, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [marca, modelo, ano, km, combustible, transmision, carroceria, descripcion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Automóvil creado", id: result.insertId });
    }
  );
};

exports.getAutomoviles = (req, res) => {
  db.query("SELECT * FROM Automovil", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getAutomovilById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Automovil WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ mensaje: "No encontrado" });
    res.json(results[0]);
  });
};

exports.updateAutomovil = (req, res) => {
  const { id } = req.params;
  const {
    marca,
    modelo,
    ano,
    km,
    combustible,
    transmision,
    carroceria,
    descripcion,
  } = req.body;
  db.query(
    "UPDATE Automovil SET marca=?, modelo=?, ano=?, km=?, combustible=?, transmision=?, carroceria=?, descripcion=? WHERE id=?",
    [
      marca,
      modelo,
      ano,
      km,
      combustible,
      transmision,
      carroceria,
      descripcion,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Automóvil actualizado" });
    }
  );
};

exports.deleteAutomovil = (req, res) => {
  const id = req.params.id;

  db.query('SELECT url_imagen FROM ImagenAutomovil WHERE automovil_id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const filenames = rows
      .map(r => {
        try {
          const u = new URL(r.url_imagen);
          return u.pathname.includes('/uploads/') ? path.basename(u.pathname) : null;
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    db.query('DELETE FROM Automovil WHERE id = ?', [id], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Automovil no encontrado' });

      Promise.all(
        filenames.map(name =>
          fs.unlink(path.join(__dirname, '..', 'uploads', name)).catch(e => {
            if (e.code !== 'ENOENT') console.error('Error borrando archivo:', name, e);
          })
        )
      )
        .then(() => res.json({ message: 'Automovil e imágenes eliminadas' }))
        .catch(() => res.json({ message: 'Automovil eliminado. Error al borrar algunas imágenes del disco (ver servidor).' }));
    });
  });
};
