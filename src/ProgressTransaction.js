import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { updateAccountBalance } from "./AccountFileHandler.js";
import Transaction from "./Transaction.js";

const ERROR_MESSAGE = {
  INVALID_PASSWORD: "[ERROR] 계좌의 비밀번호가 다릅니다. 처음부터 시작해주세요.",
}

const ProgressTransaction = {
  async depositAccount(account) {
    const DEPOSIT = "입금";
    const money = await InputView.readDepositMoney();

    account.depositBalance(money);
    await updateAccountBalance(account.accountNumber, money);
    const transaction = new Transaction(account, DEPOSIT, money);
    await 

    OutputView.printBalance(account);
  },

  async withdrawAccount(account) {
    await this.checkPassword(account);
    OutputView.printBalance(account);

    const money = await InputView.readWithdrawMoney(account);

    account.withdrawBalance(money);
    await updateAccountBalance(account.accountNumber, -money);

    OutputView.printBalance(account);
  },

  async remittanceAccount(account) {
    const opponentAccount = await InputView.readRemittanceAccount(account);
    
    await this.checkPassword(account);
    OutputView.printBalance(account);

    const money = await InputView.readRemittanceMoney(account);
    // 나중에 트랜젝션 처리하기.
    account.withdrawBalance(money);
    await updateAccountBalance(account.accountNumber, -money);
    await updateAccountBalance(opponentAccount.accountNumber, money);

    OutputView.printBalance(account);
  },

  async inquiryAccount(account) {},

  async checkAccount(account) {
    await this.checkPassword(account);
    OutputView.printBalance(account);
  },

  async checkPassword(account) {
    const password = await InputView.readPassword();
    
    if(account.password !== password) {
      throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    };
  },
};

export default ProgressTransaction;
