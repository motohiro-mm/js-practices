import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("insert into books(title) values(?)", "リーダブルコード", (err) => {
      if (err) console.log(`1つ目登録時エラー: ${err.message}`);
      db.run("insert into books(title) values(?)", "プログラマー脳", (err) => {
        if (err) console.log(`2つ目登録時エラー: ${err.message}`);
        db.all("select * from books", (err, rows) => {
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
    });
  },
);
