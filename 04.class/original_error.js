export class NotEnteredMemoError extends Error {
  constructor() {
    super();
    this.name = "NotEnteredMemoError";
    this.message =
      "No memos have been entered.\nPlease enter the memo you want to register.";
  }
}

export class NotRegisteredMemoError extends Error {
  constructor() {
    super();
    this.name = "NotRegisteredMemoError";
    this.message = "No memos have been created yet.\nPlease add a memo first.";
  }
}
export class TooManyOptionsError extends Error {
  constructor() {
    super();
    this.name = "TooManyOptionsError";
    this.message = "Please choose one option: l, r, or d.";
  }
}
export class NotAvailableOptionsError extends Error {
  constructor() {
    super();
    this.name = "NotAvailableOptionsError";
    this.message = "The only options that can be used are l, r, and d.";
  }
}
