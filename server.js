const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new Database("database.db");
const QUESTIONS_FILE = path.join(__dirname, "questions.json");

db.exec(`
  CREATE TABLE IF NOT EXISTS writings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ── Questions ─────────────────────────────────────────────

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
  try {
    const { student, content } = req.body;
    const stmt = db.prepare("INSERT INTO writings (student, content) VALUES (?, ?)");
    const result = stmt.run(student, JSON.stringify(content));
    res.send({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/writings", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM writings ORDER BY date DESC").all();
    const parsed = rows.map(row => ({
      ...row,
      content: (() => {
        try { return JSON.parse(row.content); }
        catch { return row.content; }
      })()
    }));
    res.send(parsed);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ── Root redirect to landing page ────────────────────────────
app.get("/", (req, res) => {
  res.redirect("/landing.html");
});

// ── Static files ───────────────────────────────────────────
app.use(express.static(path.join(__dirname)));

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Student exam:      http://localhost:${PORT}/index.html`);
  console.log(`Teacher dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`Admin panel:       http://localhost:${PORT}/admin.html`);
});