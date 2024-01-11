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
  await getBooks(correctSql);
  db.close();
})();
