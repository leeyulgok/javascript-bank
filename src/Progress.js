import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import AccountManager from "./AccountManager.js";

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
      }
    };

    return account;
  },

  async progressTransaction(accont) {
    let isProgressContinue = true;
    while (isProgressContinue) {
      OutputView.printProgress();
      const progress = await InputView.readProgressNumber();
      isProgressContinue = await InputView.readContinueTransaction();
    }
  },
};

export default Progress;
