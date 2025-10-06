const db = require("../db");

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
  const { id } = req.params;
  db.query("DELETE FROM Automovil WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: "Automóvil eliminado" });
  });
};
