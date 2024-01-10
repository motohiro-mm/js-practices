import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  correctSql
} from "./common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .then(() => addBook("プログラマー脳"))
  .then(() => getBooks(correctSql))
  .then(() => db.close());
