import { DBHandling } from "./db_handling.js";
import minimist from "minimist";
import readline from "readline";
import Enquirer from "enquirer";
import {
  NotEnteredMemoError,
  NotRegisteredMemoError,
  TooManyOptionsError,
  NotAvailableOptionsError,
} from "./original_error.js";

class MemoApp {
  constructor(dbPath) {
    this.dbHandling = new DBHandling(dbPath);
  }

  async operate(argv) {
    await this.dbHandling.createMemoTable();
    const options = Object.keys(argv);
    try {
      if (options.length > 2) {
        throw new TooManyOptionsError();
      } else if (
        options.length === 2 &&
        !options.some((option) => ["l", "r", "d"].includes(option))
      ) {
        throw new NotAvailableOptionsError();
      } else if (argv.l) {
        await this.displayList();
      } else if (argv.r) {
        await this.displayDetail();
      } else if (argv.d) {
        await this.delete();
      } else {
        const input = await this.input();
        await this.add(input);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await this.dbHandling.close();
    }
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

  input() {
    const lines = [];
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    return new Promise((resolve) => {
      reader.on("line", function (line) {
        lines.push(line);
      });
      reader.on("close", () => {
        resolve(lines.join("\n"));
      });
    });
  }

  async add(input) {
    if (!input) {
      throw new NotEnteredMemoError();
    }
    await this.dbHandling.add(input);
  }
}

const db = "./memo_db.sqlite3";
const argv = minimist(process.argv.slice(2));

const memoApp = new MemoApp(db);
memoApp.operate(argv);
