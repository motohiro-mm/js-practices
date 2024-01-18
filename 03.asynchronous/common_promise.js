import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const promiseDBRun = (db, sql, params) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });

export const promiseDBAll = (db, sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

export const promiseDBClose = (db) =>
  new Promise((resolve) => {
    db.close(() => resolve());
  });
