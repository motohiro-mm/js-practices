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
try {
  const insertStatement = await promiseDBRun(
    db,
    "INSERT INTO books (title) VALUES (?)",
    null,
  );
  console.log(insertStatement.lastID);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  const rows = await promiseDBAll(db, "SELECT * FROM book");
  rows.forEach((row) => {
    console.log(`${row.id} : ${row.title}`);
  });
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await promiseDBRun(db, "DROP TABLE books");
promiseDBClose(db);
