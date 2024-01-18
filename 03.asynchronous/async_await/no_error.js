import {
  db,
  promiseDBRun,
  promiseDBAll,
  promiseDBClose,
} from "../common_promise.js";

await promiseDBRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const id = await promiseDBRun(
  db,
  "INSERT INTO books (title) VALUES (?)",
  "リーダブルコード",
);
console.log(id);
const rows = await promiseDBAll(db, "SELECT * FROM books");
rows.forEach((row) => {
  console.log(`${row.id} : ${row.title}`);
});
await promiseDBRun(db, "DROP TABLE books");
promiseDBClose(db);
