const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = 3000;

const bodyParser = require("body-parser");

const db = new sqlite3.Database("./db.sqlite");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.put("/add", (req, res) => {
  const { name, author, status } = req.body;
  const sql = `INSERT INTO book(name, author, status) VALUES(?, ?, ?)`;
  db.run(sql, [name, author, status]);
  console.log(name, author, status);
  res.send("Hello World!");
});
app.get("/getBook", (req, res) => {
  const sql = `SELECT * FROM book`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  db.run(`DELETE FROM book WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.send(`Row(s) deleted ${this.changes}`);
  });
});
app.post("/update/status/:id", (req, res) => {
  const { status } = req.body;
  console.log(status);
  db.run(`UPDATE book SET status = ? WHERE id = ?`, [status, req.params.id]);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
