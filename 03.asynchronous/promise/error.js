import { db, promiseDBRun, promiseDBAll } from "../common_promise.js";

promiseDBRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  [],
)
  .then(() => promiseDBRun("INSERT INTO books (title) VALUES (?)", null))
  .then((id) => console.log(id))
  .catch((err) => console.error(err))
  .then(() => promiseDBAll("SELECT * FROM book"))
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    }),
  )
  .catch((err) => console.error(err))
  .then(() => promiseDBRun("DROP TABLE books"))
  .then(() => db.close());
