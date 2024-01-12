import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  dropTable,
  correctSql,
} from "../common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .then((id) => console.log(id))
  .then(() => getBooks(correctSql))
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`${row.id} : ${row.title}`);
    }),
  )
  .then(() => dropTable())
  .then(() => db.close());
