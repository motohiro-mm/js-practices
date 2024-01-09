import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  output,
} from "./common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .then(() => addBook("プログラマー脳"))
  .then(() => getBooks())
  .then((rows) => output(rows))
  .then(() => db.close());
