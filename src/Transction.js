import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { updateAccountBalance } from "./FileHandler.js";

const ERROR_MESSAGE = {
  INVALID_PASSWORD: "[ERROR] 계좌의 비밀번호가 다릅니다. 처음부터 시작해주세요.",
}

const Transaction = {
  async depositAccount(account) {
    const money = await InputView.readDepositMoney();

    account.depositBalance(money);
    await updateAccountBalance(account.accountNumber, money);

    OutputView.printBalance(account);
  },

  async withdrawAccount(account) {
    const password = await InputView.readPassword();
    
    if(account.password !== password) {
      throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    }

    const money = await InputView.readWithdrawMoney(account);

    account.withdrawBalance(money);
    await updateAccountBalance(account.accountNumber, -money);

    OutputView.printBalance(account);
  },

  async remittanceAccount(account) {},

  async inquiryAccount(account) {},

  async checkAccount(account) {},
};

export default Transaction;
