import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  wrongSql,
} from "../common_promise.js";

(async () => {
  await createBooksTable();
  try {
    await addBook();
  } catch (err) {
    console.error(err);
  }
  try {
    await getBooks(wrongSql);
  } catch (err) {
    console.error(err);
  }
  db.close();
})();
