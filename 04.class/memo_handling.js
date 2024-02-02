import { MemoDBHandling } from "./memo_db_handling.js";

import Enquirer from "enquirer";

export class MemoAppHandling {
  constructor(dbPath) {
    this.memoDB = new MemoDBHandling(dbPath);
  }

  async add(input) {
    await this.memoDB.add(input);
  }

  async displayList() {
    const memos = await this.memoDB.get();
    memos.forEach((memo) => {
      console.log(memo.text.split("\n")[0]);
    });
  }

  async displayDetail() {
    const memos = await this.memoDB.get();
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
    const memos = await this.memoDB.get();
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
    this.memoDB.delete(deletedMemo.id);
  }

  async close() {
    await this.memoDB.close();
  }
}
