import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  wrongSql
} from "./common_async_await.js";

(async () => {
  await createBooksTable();
  try {
    await addBook();
  } catch (err) {
    console.log(`1つ目登録時エラー: ${err}`);
  }
  try {
    await addBook();
  } catch (err) {
    console.log(`2つ目登録時エラー: ${err}`);
  }
  try {
    await getBooks(wrongSql);
    db.close();
  } catch (err) {
    console.log(`取得時エラー：${err}`);
  }
})();
