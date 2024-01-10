import {
  db,
  createBooksTable,
  addBook,
  getBooks,
} from "./common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .then(() => addBook("プログラマー脳"))
  .then(() => getBooks())
  .then(() => db.close());
