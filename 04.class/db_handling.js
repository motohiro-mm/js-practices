import sqlite3 from "sqlite3";

export class MemoDBHandling {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  createMemoTable() {
    return this.runDB(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)",
    );
  }

  add(text) {
    return this.runDB("INSERT INTO memos (text) VALUES (?)", text);
  }

  delete(id) {
    return this.runDB("DELETE FROM memos WHERE ID = (?)", id);
  }

  get() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  runDB(sql, ...params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}