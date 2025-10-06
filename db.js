const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  //password: "tu_password",
  database: "snuevos",
});

module.exports = db;
