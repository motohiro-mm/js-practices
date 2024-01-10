import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("insert into books(title) values(?)", "リーダブルコード", () => {
      db.run("insert into books(title) values(?)", "プログラマー脳", () => {
        db.all("select * from books", (err, rows) => {
          rows.forEach((row) => {
            console.log(`${row.id} : ${row.title}`);
          });
          db.close();
        });
      });
    });
  },
);
