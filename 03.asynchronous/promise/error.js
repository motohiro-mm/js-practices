import { db, promiseDBRun, promiseDBAll } from "../common_promise.js";

promiseDBRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => promiseDBRun(db, "INSERT INTO books (title) VALUES (?)", null))
  .then((id) => console.log(id))
  .catch((err) => console.error(err))
  .then(() => promiseDBAll(db, "SELECT * FROM book"))
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    }),
  )
  .catch((err) => console.error(err))
  .then(() => promiseDBRun(db, "DROP TABLE books"))
  .then(() => db.close());
