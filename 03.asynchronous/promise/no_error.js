import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  correctSql,
} from "../common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .then((id) => console.log(id))
  .then(() => getBooks(correctSql))
  .then(() => db.close());
