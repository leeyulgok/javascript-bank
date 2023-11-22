import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Account from "./Account.js";
import { writeJSONFile, readJSONFile, findAccountByNumber } from "./FileHandler.js";

class App {
  async run() {
    OutputView.printHello();

    const isExists = await InputView.readExistsAccount();
    const account = isExists ? await this.readAccount() : await this.createAccount();
    const isContinue = await InputView.readContinueTransaction();
  }

  async createAccount() {
    OutputView.printCreateAccount();
    const userName = await InputView.readUserName();
    const userAccountNumber = await InputView.readForMakeAccountNumber();
    const userPassword = await InputView.readUserPassword();
    const account = this.accountManager(userName, userAccountNumber, userPassword, 0);
    OutputView.printSuccessAccount();

    return account
  }

  async readAccount() {
    const accountNumber = await InputView.readUserAccountNumber();
    const data = await findAccountByNumber(accountNumber);
    const account = new Account(data.userName, data.accountNumber, data.password, data.balance);
    return account;
  }

  async accountManager(userName, userAccountNumber, userPassword) {
    const account = new Account(userName, userAccountNumber, userPassword);

    const accounts = await readJSONFile();
    accounts.push({
      userName: account.UserName,
      accountNumber: account.accountNumber,
      password: account.password,
      balance: account.balance,
    });

    await writeJSONFile(accounts);

    return account;
  }
}

export default App;
