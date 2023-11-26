import Account from "./Account.js";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { saveAccount } from "./AccountFileHandler.js";

const AccountManager = {
  async createAccount() {
    OutputView.printCreateAccount();
    const DEFAULT_BALANCE = 0;
    const userName = await InputView.readUserName();
    const userAccountNumber = await InputView.readForMakeAccountNumber();
    const userPassword = await InputView.readUserPassword();

    const account = new Account(
      userName,
      userAccountNumber,
      userPassword,
      DEFAULT_BALANCE
    );

    await saveAccount(account);

    OutputView.printSuccessAccount();

    return account;
  },

  async readAccount() {
    const data = await InputView.readUserAccountNumber();
    const account = new Account(
      data.userName,
      data.accountNumber,
      data.password,
      data.balance
    );
    return account;
  },
};

export default AccountManager;
