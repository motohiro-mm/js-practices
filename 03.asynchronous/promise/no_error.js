import { db, promiseDBRun, promiseDBAll } from "../common_promise.js";

promiseDBRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  [],
)
  .then(() =>
    promiseDBRun("INSERT INTO books(title) VALUES(?)", "リーダブルコード"),
  )
  .then((id) => console.log(id))
  .then(() => promiseDBAll("SELECT * FROM books"))
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    }),
  )
  .then(() => promiseDBRun("DROP TABLE books"))
  .then(() => db.close());
