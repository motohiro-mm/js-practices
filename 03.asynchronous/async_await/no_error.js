import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  correctSql
} from "./common_async_await.js";

(async () => {
  await createBooksTable();
  await addBook("リーダブルコード");
  await addBook("プログラマー脳");
  await getBooks(correctSql);
  db.close();
})();
