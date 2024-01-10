import {
  db,
  createBooksTable,
  addBook,
  getBooks,
} from "./common_promise.js";

createBooksTable()
  .then(() => addBook("リーダブルコード"))
  .catch((err) => console.log(`1つ目登録時エラー: ${err}`))
  .then(() => addBook("リーダブルコード"))
  .catch((err) => console.log(`2つ目登録時エラー: ${err}`))
  .then(() => getBooks())
  .catch((err) => console.log(`取得時エラー：${err}`))
  .then(() => db.close());
