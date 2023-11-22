class Account {
  #userName;
  #accountNumber;
  #password;
  #balance;

  constructor(userName, accountNumber, password, balance) {
    this.#userName = userName;
    this.#accountNumber = accountNumber;
    this.#password = password;
    this.#balance = balance;
  };

  get UserName() {
    return this.#userName;
  };

  get accountNumber() {
    return this.#accountNumber;
  };

  get password() {
    return this.#password;
  };

  get balance() {
    return this.#balance;
  };
};

export default Account;