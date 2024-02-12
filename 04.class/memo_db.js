import sqlite3 from "sqlite3";

export class MemoDB {
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

  get_all() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  fetch_text(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT text FROM memos WHERE ID = (?)", id, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.text);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
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
      this.db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
