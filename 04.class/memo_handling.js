import { DBHandling } from "./db_handling.js";

import Enquirer from "enquirer";

export class MemoHandling {
  constructor(dbPath) {
    this.dbHandling = new DBHandling(dbPath);
  }

  async add(input) {
    await this.dbHandling.add(input);
  }

  async displayList() {
    const memos = await this.dbHandling.get();
    memos.forEach((memo) => {
      console.log(memo.text.split("\n")[0]);
    });
  }

  async displayDetail() {
    const memos = await this.dbHandling.get();
    memos.forEach((memo) => {
      memo.name = memo.text.split("\n")[0];
    });
    const question = {
      type: "select",
      name: "name",
      message: "Choose a note you want to see:",
      choices: memos,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    };
    const answer = await Enquirer.prompt(question);
    const memoDetail = memos.find((memo) => {
      return memo.id === answer.name.id;
    });
    console.log(memoDetail.text);
  }

  async delete() {
    const memos = await this.dbHandling.get();
    memos.forEach((memo) => {
      memo.name = memo.text.split("\n")[0];
    });
    const question = {
      type: "select",
      name: "name",
      message: "Choose a note you want to delete:",
      choices: memos,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    };
    const answer = await Enquirer.prompt(question);
    const deletedMemo = memos.find((memo) => {
      return memo.id === answer.name.id;
    });
    this.dbHandling.delete(deletedMemo.id);
  }

  async createMemoTable() {
    await this.dbHandling.createMemoTable();
  }

  async close() {
    await this.dbHandling.close();
  }
}
