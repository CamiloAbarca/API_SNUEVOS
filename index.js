require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // <-- agregar esta línea

const usuarioRoutes = require("./routes/usuario");
const automovilRoutes = require("./routes/automovil");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // <-- opcional si aún no está

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/automoviles", automovilRoutes);

// servir imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// montar la ruta de imágenes
app.use('/imagenes', require('./routes/imagenAutomovil'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API escuchando en http://localhost:${PORT}`)
);
