import {
  db,
  promiseDBRun,
  promiseDBAll,
  promiseDBClose,
} from "../database_operations.js";

promiseDBRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => promiseDBRun(db, "INSERT INTO books (title) VALUES (?)", null))
  .then((insertStatement) => {
    console.log(insertStatement.lastID);
  })
  .catch((err) => console.error(err.message))
  .then(() => promiseDBAll(db, "SELECT * FROM book"))
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    })
  })
  .catch((err) => console.error(err.message))
  .then(() => promiseDBRun(db, "DROP TABLE books"))
  .then(() => promiseDBClose(db));
