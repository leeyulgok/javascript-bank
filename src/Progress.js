import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import AccountManager from "./AccountManager.js";
import Transaction from "./Transction.js";

const PROGRESS_NUMER = {
  DEPOSIT: "1",
  WITHDRAW: "2",
  REMITTANCE: "3",
  INQUIRY: "4",
  CHECK: "5",
  EXIT: "9",
};

const Progress = {
  async progressAccount() {
    let isAccountContinue = true;
    let account;

    while (isAccountContinue) {
      const isExists = await InputView.readExistsAccount();

      if (isExists) {
        account = await AccountManager.readAccount();
        isAccountContinue = false;
      } else {
        await AccountManager.createAccount();
        isAccountContinue = await InputView.readContinueTransaction();
      };
    };

    return account;
  },

  async progressTransaction(account) {
    let isProgressContinue = true;

    while (isProgressContinue) {
      OutputView.printProgress();
      const progress = await InputView.readProgressNumber();

      if (progress === PROGRESS_NUMER.EXIT) {
        return isProgressContinue = false;
      } else {
        await this.transaction(account, progress);
      };
      
      isProgressContinue = await InputView.readContinueTransaction();
    };
  },

  async transaction(account, progress, isProgressContinue) {
    if (progress === PROGRESS_NUMER.DEPOSIT) {
      await Transaction.depositAccount(account);
    } else if (progress === PROGRESS_NUMER.WITHDRAW) {
      await Transaction.withdrawAccount(account);
    } else if (progress === PROGRESS_NUMER.REMITTANCE) {
      await Transaction.remittanceAccount(account);
    } else if (progress === PROGRESS_NUMER.INQUIRY) {
      await Transaction.inquiryAccount(account);
    } else if (progress === PROGRESS_NUMER.CHECK) {
      await Transaction.checkAccount(account);
    };
  },
};

export default Progress;
