const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuario");
const automovilRoutes = require("./routes/automovil");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/automoviles", automovilRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
