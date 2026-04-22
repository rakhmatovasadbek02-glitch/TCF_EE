const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve index.html, dashboard.html, style.css, script.js as static files
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database("database.db");

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS writings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Student exam:       http://localhost:3000/index.html");
  console.log("Teacher dashboard:  http://localhost:3000/dashboard.html");
});