import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  wrongSql,
} from "../common_promise.js";

createBooksTable()
  .then(() => addBook())
  .catch((err) => console.error(err))
  .then(() => getBooks(wrongSql))
  .catch((err) => console.error(err))
  .then(() => db.close());
