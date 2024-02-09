export class NotEnteredDataError extends Error {
  constructor(dataName) {
    super();
    this.name = "NotEnteredDataError";
    this.message = `No ${dataName}s have been entered.\nPlease enter the ${dataName} you want to register.`;
  }
}

export class NotRegisteredDataError extends Error {
  constructor(dataName) {
    super();
    this.name = "NotRegisteredDataError";
    this.message = `No ${dataName}s have been created yet.\nPlease add a ${dataName} first.`;
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
