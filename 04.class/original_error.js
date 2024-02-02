export class NoEnteredMemoError extends Error {
  constructor() {
    super();
    this.name = "NoEnteredMemoError";
    this.message =
      "No memos have been entered.\nPlease enter the memo you want to register.";
  }
}

export class NoRegisteredMemoError extends Error {
  constructor() {
    super();
    this.name = "NoRegisteredMemoError";
    this.message = "No memos have been created yet.\nPlease add a memo first.";
  }
}
