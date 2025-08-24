import mysql from "mysql2/promise";

// Configuración usando la conexión de Railway
const pool = mysql.createPool({
  host: "interchange.proxy.rlwy.net", // Host de Railway
  user: "root", // Usuario
  password: "lVhPnNIaROzDCtklMqbkMjkScFCBHJSJ", // Contraseña
  database: "organizador", // Nombre de la base
  port: 21208, // Puerto
});

export default pool;
