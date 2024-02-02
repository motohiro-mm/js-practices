import { MemoHandling } from "./memo_handling.js";
import minimist from "minimist";
import readline from "readline";
import {
  TooManyOptionsError,
  NotAvailableOptionsError,
} from "./original_error.js";

class MemoApp {
  async operate(db, argv) {
    const memoHandling = new MemoHandling(db);
    await memoHandling.createMemoTable();
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
        await memoHandling.displayList();
      } else if (argv.r) {
        await memoHandling.displayDetail();
      } else if (argv.d) {
        await memoHandling.delete();
      } else {
        const input = await this.input();
        await memoHandling.add(input);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await memoHandling.close();
    }
  }
  input() {
    let lines = [];
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
}

const db = "./memo_db.sqlite3";
const argv = minimist(process.argv.slice(2));

const memoApp = new MemoApp();
memoApp.operate(db, argv);
