import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import AccountManager from "./AccountManager.js";

class App {
  async run() {
    OutputView.printHello();

    const isExists = await InputView.readExistsAccount();
    const account = isExists
      ? await AccountManager.readAccount()
      : await AccountManager.createAccount();
    const isContinue = await InputView.readContinueTransaction();
  }
}

export default App;
