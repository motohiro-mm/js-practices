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
      if (error instanceof NoRegisteredMemoError) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  async displayDetail() {
    try {
      const memos = await this.dbHandling.get();
      if (memos.length === 0) {
        throw new NoRegisteredMemoError();
      }
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
      } catch (error) {
      if (error instanceof NoRegisteredMemoError) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  async delete() {
    try {
      const memos = await this.dbHandling.get();
      if (memos.length === 0) {
        throw new NoRegisteredMemoError();
      }
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
    } catch (error) {
      if (error instanceof NoRegisteredMemoError) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  async createMemoTable() {
    await this.dbHandling.createMemoTable();
  }

  async close() {
    await this.dbHandling.close();
  }
}
