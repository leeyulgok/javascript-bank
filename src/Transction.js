import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { updateAccountBalance } from "./FileHandler.js";

const Transaction = {
  async depositAccount(account) {
    const money = await InputView.readDepositMoney();

    account.depositBalance(money);
    await updateAccountBalance(account.accountNumber, money);
    
    OutputView.printBalanc(account);
  },

  async withdrawAccount(account) {},

  async remittanceAccount(account) {},

  async inquiryAccount(account) {},

  async checkAccount(account) {},
};

export default Transaction;
