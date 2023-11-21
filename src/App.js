import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printHello();

    const isExists = await InputView.readExistsAccount();
    isExists ? this.readAccount : this.createAccount();
  }

  async createAccount() {
    OutputView.printCreateAccount();
    const userName = await InputView.readUserName();
    const userAccount = await InputView.readUserAccoint();
    const userPassword = await InputView.readUserPassword();
  }

  async readAccount() {

  }
}

export default App;
