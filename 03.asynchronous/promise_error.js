import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  wrongSql
} from "./common_promise.js";

createBooksTable()
  .then(() => addBook())
  .catch((err) => console.log(`1つ目登録時エラー: ${err}`))
  .then(() => addBook("リーダブルコード"))
  .catch((err) => console.log(`2つ目登録時エラー: ${err}`))
  .then(() => getBooks(wrongSql))
  .catch((err) => console.log(`取得時エラー：${err}`))
  .then(() => db.close());
