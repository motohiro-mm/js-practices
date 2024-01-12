import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  dropTable,
  wrongSql,
} from "../common_promise.js";

createBooksTable()
  .then(() => addBook())
  .then((id) => console.log(id))
  .catch((err) => console.error(err))
  .then(() => getBooks(wrongSql))
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    }),
  )
  .catch((err) => console.error(err))
  .then(() => dropTable())
  .then(() => db.close());
