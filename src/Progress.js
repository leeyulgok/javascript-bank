import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import AccountManager from "./AccountManager.js";
import ProgressTransaction from "./ProgressTransaction.js";
import { Console } from "@woowacourse/mission-utils";

const PROGRESS_NUMER = {
  DEPOSIT: "1",
  WITHDRAW: "2",
  REMITTANCE: "3",
  INQUIRY: "4",
  CHECK: "5",
  EXIT: "9",
};

const IS_TRUE = {
  YES: "1",
  NO: "2",
}

const Progress = {
  async progressAccount() {
    let isAccountContinue = true;
    let account;

    while (isAccountContinue) {
      const isExists = await InputView.readExistsAccount();

      if (isExists === IS_TRUE.YES) {
        account = await AccountManager.readAccount();
        isAccountContinue = false;
      } else if(isExists === IS_TRUE.NO) {
        await AccountManager.createAccount();
        isAccountContinue = await InputView.readContinueTransaction();
      }
    }

    return account;
  },

  async progressTransaction(account) {
    let isProgressContinue = true;

    while (isProgressContinue) {
      OutputView.printProgress();
      const progress = await InputView.readProgressNumber();

      if (progress === PROGRESS_NUMER.EXIT) {
        return (isProgressContinue = false);
      } else {
        try {
          await this.transaction(account, progress);
        } catch (error) {
          Console.print(`${error.message}`);
          return (isProgressContinue = false);
        }
      }

      isProgressContinue = await InputView.readContinueTransaction() === IS_TRUE.YES ? true : false;
    }
  },

  async transaction(account, progress) {
    if (progress === PROGRESS_NUMER.DEPOSIT) {
      await ProgressTransaction.depositAccount(account);
    } else if (progress === PROGRESS_NUMER.WITHDRAW) {
      await ProgressTransaction.withdrawAccount(account);
    } else if (progress === PROGRESS_NUMER.REMITTANCE) {
      await ProgressTransaction.remittanceAccount(account);
    } else if (progress === PROGRESS_NUMER.INQUIRY) {
      await ProgressTransaction.inquiryAccount(account);
    } else if (progress === PROGRESS_NUMER.CHECK) {
      await ProgressTransaction.checkAccount(account);
    }
  },
};

export default Progress;
