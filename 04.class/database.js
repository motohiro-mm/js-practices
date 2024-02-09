import sqlite3 from "sqlite3";

export class Database {
  constructor(dbInfo) {
    this.db = new sqlite3.Database(dbInfo.dbPath);
    this.tableName = dbInfo.tableName;
    this.tablePlan = dbInfo.tablePlan;
    this.specifiedColumn = dbInfo.specifiedColumn;
  }

  createTable() {
    return this.runDB(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (${this.tablePlan})`,
    );
  }

  add(text) {
    return this.runDB(
      `INSERT INTO ${this.tableName} (${this.specifiedColumn}) VALUES (?)`,
      text,
    );
  }

  delete(id) {
    return this.runDB(`DELETE FROM ${this.tableName} WHERE ID = (?)`, id);
  }

  get() {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName} ORDER BY id`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
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
