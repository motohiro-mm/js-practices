import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  correctSql,
} from "../common_promise.js";

(async () => {
  await createBooksTable();
  const id = await addBook("リーダブルコード");
  console.log(id);
  await getBooks(correctSql);
  db.close();
})();
