import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", (err) => {
      if (err) console.log(`登録時エラー: ${err.message}`);
      db.all("SELECT * FROM book", (err, rows) => {
        if (err) {
          console.log(`取得時エラー: ${err.message}`);
        } else {
          rows.forEach((row) => {
            console.log(`${row.id} : ${row.title}`);
          });
        }
        db.close();
      });
    });
  },
);
