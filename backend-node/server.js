import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Middleware
app.use(cors()); // Habilita CORS para todos los dominios (puedes restringirlo si quieres)
app.use(express.json()); // Parseo de JSON en requests

// 🔹 Rutas

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// Agregar una tarea
app.post("/tasks", async (req, res) => {
  const { day, description } = req.body;
  if (!day || !description) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (day, description) VALUES (?, ?)",
      [day, description]
    );
    res.json({ id: result.insertId, day, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar tarea" });
  }
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
