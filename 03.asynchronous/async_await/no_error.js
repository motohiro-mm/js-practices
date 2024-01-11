import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  correctSql,
} from "../common_promise.js";

(async () => {
  await createBooksTable();
  await addBook("リーダブルコード");
  await addBook("プログラマー脳");
  await getBooks(correctSql);
  db.close();
})();
