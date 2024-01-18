import {
  db,
  promiseDBRun,
  promiseDBAll,
  promiseDBClose,
} from "../common_promise.js";

promiseDBRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    promiseDBRun(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "リーダブルコード",
    ),
  )
  .then((id) => {
    console.log(id);
    return promiseDBAll(db, "SELECT * FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    });
    return promiseDBRun(db, "DROP TABLE books");
  })
  .then(() => promiseDBClose(db));
