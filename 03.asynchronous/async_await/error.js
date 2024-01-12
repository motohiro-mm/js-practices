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
    console.error(err);
  }
  try {
    const rows = await getBooks(wrongSql);
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    });
  } catch (err) {
    console.error(err);
  }
  await dropTable();
  db.close();
})();
