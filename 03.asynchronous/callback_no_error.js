import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run(
      "insert into books(title) values(?)",
      "リーダブルコード",
      function (err) {
        if (err) console.log(`1つ目登録時エラー:${err.message}`);
        db.run(
          "insert into books(title) values(?)",
          "パーフェクトRuby on Rails",
          function (err) {
            if (err) console.log(`2つ目登録時エラー:${err.message}`);
            db.each("select * from books", function (err, row) {
              if (err) {
                console.log(`取得時エラー:${err.message}`);
              } else {
                console.log(`${row.id} : ${row.title}`);
              }
            });
          },
        );
      },
    );
  },
);
db.close();