import OutputView from "./OutputView.js";
import Progress from "./Progress.js";

class App {
  async run() {
    OutputView.printHello();

    const accont = await Progress.progressAccount();
    if (accont) {
      await Progress.progressTransaction(accont);
    };

    OutputView.printExit();
  };
};

export default App;
