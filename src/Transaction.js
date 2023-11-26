class Transaction {
  #account
  #transactionType
  #money
  #targetAccountNumber

  constructor(account, transactionType, money, targetAccountNumber) {
    this.#account = account;
    this.#transactionType = transactionType;
    this.#money = money;
    this.#targetAccountNumber = targetAccountNumber;
  };

  get account() {
    return this.#account;
  };

  get transactionType() {
    return this.#transactionType;
  };

  get money() {
    return this.#money
  };

  get targetAccountNumber() {
    return this.#targetAccountNumber;
  };
};

export default Transaction;