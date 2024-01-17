import { db, promiseDBRun, promiseDBAll } from "../common_promise.js";

(async () => {
  await promiseDBRun(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    [],
  );
  const id = await promiseDBRun(
    "INSERT INTO books(title) VALUES(?)",
    "リーダブルコード",
  );
  console.log(id);
  const rows = await promiseDBAll("SELECT * FROM books");
  rows.forEach((row) => {
    console.log(`${row.id} : ${row.title}`);
  });
  await promiseDBRun("DROP TABLE books");
  db.close();
})();
