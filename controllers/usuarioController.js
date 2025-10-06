const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO Usuario (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)",
      [nombre, apellido, correo, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: "Usuario creado", id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error: err });
  }
};

exports.login = (req, res) => {
  const { correo, password } = req.body;
  db.query(
    "SELECT * FROM Usuario WHERE correo = ?",
    [correo],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(400).json({ mensaje: "Usuario no encontrado" });

      const usuario = results[0];
      const validPass = await bcrypt.compare(password, usuario.password);
      if (!validPass)
        return res.status(400).json({ mensaje: "Contraseña incorrecta" });

      const token = jwt.sign({ id: usuario.id }, "mi_secreto", {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
};
