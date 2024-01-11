import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const createBooksTable = () =>
  new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      },
    );
  });

export const addBook = (title) =>
  new Promise((resolve, reject) => {
    db.run("INSERT INTO books(title) VALUES(?)", title, (err) => {
      err ? reject(err) : resolve();
    });
  });

export const getBooks = (sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          console.log(`${row.id} : ${row.title}`);
        });
      }
    });
  });

export const correctSql = "SELECT * FROM books";
export const wrongSql = "SELECT * FROM book";
