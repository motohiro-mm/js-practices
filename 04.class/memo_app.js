import { MemoAppHandling } from "./memo_app_handling.js";

import minimist from "minimist";
import readline from "readline";

class MemoApp {
  async operate(db, argv) {
    const memoAppHandling = new MemoAppHandling(db);
    if (argv.l) {
      await memoAppHandling.displayList();
    } else if (argv.r) {
      await memoAppHandling.displayDetail();
    } else if (argv.d) {
      await memoAppHandling.delete();
    } else {
      const input = await this.input();
      await memoAppHandling.add(input);
    }
    memoAppHandling.close();
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
