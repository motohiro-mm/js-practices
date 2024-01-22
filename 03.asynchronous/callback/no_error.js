import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "リーダブルコード",
      function () {
        console.log(this.lastID);
        db.all("SELECT * FROM books", (_, rows) => {
          rows.forEach((row) => {
            console.log(`${row.id} : ${row.title}`);
          });
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      },
    );
  },
);
