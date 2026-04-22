const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");
const QUESTIONS_FILE = path.join(__dirname, "questions.json");

db.run(`
  CREATE TABLE IF NOT EXISTS writings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ── Questions ─────────────────────────────────────────────
// NOTE: API routes must come BEFORE express.static

app.get("/questions", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(QUESTIONS_FILE, "utf8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Could not read questions file." });
  }
});

app.post("/questions", (req, res) => {
  try {
    if (!req.body || !req.body.sets) {
      return res.status(400).json({ error: "Invalid data format." });
    }
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(req.body, null, 2), "utf8");
    res.json({ ok: true });
  } catch (err) {
    console.error("Error writing questions:", err);
    res.status(500).json({ error: "Could not write questions file." });
  }
});

// ── Writings ──────────────────────────────────────────────

app.post("/save", (req, res) => {
  const { student, content } = req.body;
  db.run(
    "INSERT INTO writings (student, content) VALUES (?, ?)",
    [student, JSON.stringify(content)],
    function (err) {
      if (err) return res.status(500).send(err);
      res.send({ id: this.lastID });
    }
  );
});

app.get("/writings", (req, res) => {
  db.all("SELECT * FROM writings ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).send(err);
    const parsed = rows.map(row => ({
      ...row,
      content: (() => {
        try { return JSON.parse(row.content); }
        catch { return row.content; }
      })()
    }));
    res.send(parsed);
  });
});

// ── Static files — AFTER API routes ───────────────────────
app.use(express.static(path.join(__dirname)));

// ── Start ──────────────────────────────────────────────────
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Student exam:       http://localhost:3000/index.html");
  console.log("Teacher dashboard:  http://localhost:3000/dashboard.html");
  console.log("Admin panel:        http://localhost:3000/admin.html");
});