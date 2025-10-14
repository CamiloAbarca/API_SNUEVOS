require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // <-- asegurado

const usuarioRoutes = require("./routes/usuario");
const automovilRoutes = require("./routes/automovil");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// IMPORTANTE: Comenta o elimina esta línea si tu servidor web (Apache/Nginx)
// ya está configurado para servir los archivos desde el directorio configurado en UPLOADS_PHYSICAL_PATH.
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/automoviles", automovilRoutes);

// montar la ruta de imágenes en /api/imagenes
app.use("/api/imagenes", require("./routes/imagenAutomovil"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API escuchando en http://localhost:${PORT}`)
);
