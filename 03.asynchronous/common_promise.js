import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export function createBooksTable() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      },
    );
  });
}

export function addBook(title) {
  return new Promise((resolve, reject) => {
    db.run("insert into books(title) values(?)", title, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

export function getBooks() {
  return new Promise((resolve, reject) => {
    db.all("select * from books", (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

export function output(rows) {
  rows.forEach((row) => {
    console.log(`${row.id} : ${row.title}`);
  });
}
