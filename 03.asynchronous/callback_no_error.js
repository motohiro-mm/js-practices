import sqlite3 from "sqlite3";
const db = new sqlite3.Database(':memory:');
db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", function() {
  db.run("insert into books(title) values(?)", "リーダブルコード", function() {
    db.run("insert into books(title) values(?)", "パーフェクトRuby on Rails", function() {
      db.each("select * from books", function(err, row) {
        console.log(`${row.id} : ${row.title}`);
      });
    });
  });
});

db.close();
