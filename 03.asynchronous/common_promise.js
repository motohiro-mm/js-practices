import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const promiseDBRun = (sql, params) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this.lastID);
    });
  });

export const promiseDBAll = (sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
