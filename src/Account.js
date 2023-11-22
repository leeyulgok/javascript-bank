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
  }

  get UserName() {
    return this.#userName;
  }

  get accountNumber() {
    return this.#accountNumber;
  }

  get password() {
    return this.#password;
  }

  get balance() {
    return this.#balance;
  }

  depositBalance(input) {
    this.#balance += this.validateMoney(input);
  }

  withdrawBalance(input) {
    const money = this.validateMoney(input);
    if (money <= this.#balance) {
      this.#balance -= money;
    } else {
      throw new Error("[ERROR] 출금하려는 금액이 더 많습니다.");
    }
  }

  validateMoney(input) {
    const money = parseInt(input, 10);
    if (isNaN(money) || money < 0) {
      throw new Error("[ERROR] 입력한 값이 올바르지 않습니다.");
    }
    return money;
  }
}

export default Account;
