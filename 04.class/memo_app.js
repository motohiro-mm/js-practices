import { Database } from "./database.js";
import minimist from "minimist";
import readline from "readline";
import Enquirer from "enquirer";
import {
  NotEnteredDataError,
  NotRegisteredDataError,
  TooManyOptionsError,
  NotAvailableOptionsError,
} from "./original_error.js";

class CLIApp {
  constructor(dbInfo, dataName) {
    this.db = new Database(dbInfo);
    this.dataName = dataName;
  }

  async operate(argv) {
    await this.db.createTable();
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
      await this.db.close();
    }
  }

  async displayList() {
    const registeredData = await this.db.get();
    if (registeredData.length === 0) {
      throw new NotRegisteredDataError(this.dataName);
    }
    registeredData.forEach((data) => {
      console.log(data.text.split("\n")[0]);
    });
  }

  async displayDetail() {
    const registeredData = await this.db.get();
    if (registeredData.length === 0) {
      throw new NotRegisteredDataError(this.dataName);
    }
    const detail = await this.pickUp(this.addFirstLine(registeredData), "see");
    console.log(detail.text);
  }

  async delete() {
    const registeredData = await this.db.get();
    if (registeredData.length === 0) {
      throw new NotRegisteredDataError(this.dataName);
    }
    const deletedData = await this.pickUp(
      this.addFirstLine(registeredData),
      "delete",
    );
    this.db.delete(deletedData.id);
  }

  async pickUp(choices, action) {
    const question = {
      type: "select",
      name: "name",
      message: `Choose a note you want to ${action}:`,
      choices: choices,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    };
    const answer = await Enquirer.prompt(question);
    return choices.find(
      (registeredData) => registeredData.id === answer.name.id,
    );
  }

  addFirstLine(registeredData) {
    registeredData.forEach((rd) => {
      rd.name = rd.text.split("\n")[0];
    });
    return registeredData;
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
      throw new NotEnteredDataError(this.dataName);
    }
    await this.db.add(input);
  }
}

const dbInfo = {
  dbPath: "./memo_db.sqlite3",
  tableName: "memos",
  tablePlan: "id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL",
  specifiedColumn: "text",
};

const argv = minimist(process.argv.slice(2));

const memoApp = new CLIApp(dbInfo, "memo");
memoApp.operate(argv);
