import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  dropTable,
  wrongSql,
} from "../common_promise.js";

(async () => {
  await createBooksTable();
  try {
    const id = await addBook();
    console.log(id);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(err);
    } else {
      throw err;
    }
  }
  try {
    const rows = await getBooks(wrongSql);
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
  await dropTable();
  db.close();
})();
