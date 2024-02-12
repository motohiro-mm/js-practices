import { MemoDB } from "./memo_db.js";
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
    this.memo_db = new MemoDB(dbPath);
  }

  async operate(argv) {
    await this.memo_db.createMemoTable();
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
      await this.memo_db.close();
    }
  }

  async displayList() {
    const memos = await this.memo_db.get_all();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    memos.forEach((memo) => {
      console.log(memo.text.split("\n")[0]);
    });
  }

  async displayDetail() {
    const memos = await this.memo_db.get_all();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    const selectMemoID = await this.pickUpID(this.addFirstLine(memos), "see");
    const selectedText = await this.memo_db.fetch_text(selectMemoID);
    console.log(selectedText);
  }

  async delete() {
    const memos = await this.memo_db.get_all();
    if (memos.length === 0) {
      throw new NotRegisteredMemoError();
    }
    const deletedMemoID = await this.pickUpID(
      this.addFirstLine(memos),
      "delete",
    );
    this.memo_db.delete(deletedMemoID);
  }

  async pickUpID(choiceMemos, action) {
    const question = {
      type: "select",
      name: "id",
      message: `Choose a note you want to ${action}:`,
      choices: choiceMemos,
      result() {
        return this.focused.id;
      },
    };
    const answer = await Enquirer.prompt(question);
    return answer.id;
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
    await this.memo_db.add(input);
  }
}

const db = "./memo_db.sqlite3";
const argv = minimist(process.argv.slice(2));

const memoApp = new MemoApp(db);
memoApp.operate(argv);
