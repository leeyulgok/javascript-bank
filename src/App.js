import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printHello();
    
    const isExists = await InputView.readExistsAccount();
  }
}

export default App;
