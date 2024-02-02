import { DBHandling } from "./db_handling.js";
import { NoEnteredMemoError, NoRegisteredMemoError } from "./original_error.js";
import Enquirer from "enquirer";

export class MemoHandling {
  constructor(dbPath) {
    this.dbHandling = new DBHandling(dbPath);
  }

  async add(input) {
    try {
      if (!input) {
        throw new NoEnteredMemoError();
      }
      await this.dbHandling.add(input);
    } catch (error) {
      if (error instanceof NoEnteredMemoError) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  async displayList() {
    try {
      const memos = await this.dbHandling.get();
      if (memos.length === 0) {
        throw new NoRegisteredMemoError();
      }
      memos.forEach((memo) => {
        console.log(memo.text.split("\n")[0]);
      });
    } catch (error) {
      this.checkNoRegisteredMemoError(error);
    }
  }

  async displayDetail() {
    try {
      const memos = await this.dbHandling.get();
      if (memos.length === 0) {
        throw new NoRegisteredMemoError();
      }
      const memoDetail = await this.pickUp(this.addFirstLine(memos), "see");
      console.log(memoDetail.text);
    } catch (error) {
      this.checkNoRegisteredMemoError(error);
    }
  }

  async delete() {
    try {
      const memos = await this.dbHandling.get();
      if (memos.length === 0) {
        throw new NoRegisteredMemoError();
      }
      const deletedMemo = await this.pickUp(this.addFirstLine(memos), "delete");
      this.dbHandling.delete(deletedMemo.id);
    } catch (error) {
      this.checkNoRegisteredMemoError(error);
    }
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

  checkNoRegisteredMemoError(error) {
    if (error instanceof NoRegisteredMemoError) {
      console.error(error.message);
    } else {
      throw error;
    }
  }
}
