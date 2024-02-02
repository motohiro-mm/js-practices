import { DBHandling } from "./db_handling.js";
import {
  NotEnteredMemoError,
  NotRegisteredMemoError,
} from "./original_error.js";
import Enquirer from "enquirer";

export class MemoHandling {
  constructor(dbPath) {
    this.dbHandling = new DBHandling(dbPath);
  }

  async add(input) {
    if (!input) {
      throw new NotEnteredMemoError();
    }
    await this.dbHandling.add(input);
  }

  async displayList() {
    const memos = await this.dbHandling.get();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    memos.forEach((memo) => {
      console.log(memo.text.split("\n")[0]);
    });
  }

  async displayDetail() {
    const memos = await this.dbHandling.get();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    const memoDetail = await this.pickUp(this.addFirstLine(memos), "see");
    console.log(memoDetail.text);
  }

  async delete() {
    const memos = await this.dbHandling.get();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    const deletedMemo = await this.pickUp(this.addFirstLine(memos), "delete");
    this.dbHandling.delete(deletedMemo.id);
  }

  async createMemoTable() {
    await this.dbHandling.createMemoTable();
  }

  async close() {
    await this.dbHandling.close();
  }

  async pickUp(choiceMemos, action) {
    const question = {
      type: "select",
      name: "name",
      message: `Choose a note you want to ${action}:`,
      choices: choiceMemos,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    };
    const answer = await Enquirer.prompt(question);
    return choiceMemos.find((memo) => memo.id === answer.name.id);
  }

  addFirstLine(memos) {
    memos.forEach((memo) => {
      memo.name = memo.text.split("\n")[0];
    });
    return memos;
  }
}
