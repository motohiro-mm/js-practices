import { db, promiseDBRun, promiseDBAll } from "../common_promise.js";

(async () => {
  await promiseDBRun(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    [],
  );
  try {
    const id = await promiseDBRun("INSERT INTO books (title) VALUES ?)");
    console.log(id);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(err);
    } else {
      throw err;
    }
  }
  try {
    const rows = await promiseDBAll("SELECT * FROM book");
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    });
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err);
    } else {
      throw err;
    }
  }
  await promiseDBRun("DROP TABLE books");
  db.close();
})();
