import {
  db,
  createBooksTable,
  addBook,
  getBooks,
  dropTable,
  correctSql,
} from "../common_promise.js";

(async () => {
  await createBooksTable();
  const id = await addBook("リーダブルコード");
  console.log(id);
  const rows = await getBooks(correctSql);
  rows.forEach((row) => {
    console.log(`${row.id} : ${row.title}`);
  });
  await dropTable();
  db.close();
})();
