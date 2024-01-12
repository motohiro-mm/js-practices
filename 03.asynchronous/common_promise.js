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
    db.run("INSERT INTO books(title) VALUES(?)", title, function (err) {
      err ? reject(err) : resolve(this.lastID);
    });
  });

export const getBooks = (sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });

export const dropTable = () =>
  new Promise((resolve) => {
    db.run("DROP TABLE books", () => {
      resolve();
    });
  });

export const correctSql = "SELECT * FROM books";
export const wrongSql = "SELECT * FROM book";
