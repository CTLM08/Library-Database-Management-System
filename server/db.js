const sqlite3 = require("sqlite3").verbose();
let sql;
let db = new sqlite3.Database("./db.sqlite", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to db");
  }
});

db.serialize(() => {
  // Create table
  sql = `CREATE TABLE book(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL
  )`;
  db.run(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table created");
    }
  });
});
