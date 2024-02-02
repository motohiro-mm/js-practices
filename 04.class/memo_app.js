import { MemoHandling } from "./memo_handling.js";
import minimist from "minimist";
import readline from "readline";

class MemoApp {
  async operate(db, argv) {
    const memoHandling = new MemoHandling(db);
    await memoHandling.createMemoTable();
    const options = Object.keys(argv);
    if (options.length > 2) {
      console.error("Please choose one option: l, r, or d.");
    } else if (
      options.length === 2 &&
      !options.some((option) => ["l", "r", "d"].includes(option))
    ) {
      console.error("The only options that can be used are l, r, and d.");
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
    memoHandling.close();
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
      reader.on("close", function () {
        resolve(lines.join("\n"));
      });
    });
  }
}

const db = "./memo_db.sqlite3";
const argv = minimist(process.argv.slice(2));

const memoApp = new MemoApp();
memoApp.operate(db, argv);
