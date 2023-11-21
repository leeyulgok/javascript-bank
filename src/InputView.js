import { Console } from "@woowacourse/mission-utils";
import { validateIsExistsAccount } from "./validateAccount.js";

const CONSOLE_MESSAGE = {
  EXISTS_ACCOUNT: "계좌가 존재하신가요(2를 누를 경우, 자동으로 계좌 개설로 넘어갑니다.)?\n",
};

const InputView = {
  async readExistsAccount() {
    return readInput(CONSOLE_MESSAGE.EXISTS_ACCOUNT, validateIsExistsAccount);
  },
};

const readInput = async (msg, fn) => {
  let firstAttempt = true;

  while (true) {
    try {
      const input = await Console.readLineAsync(firstAttempt ? msg : "");
      firstAttempt = false;
      
      return fn(input);
    } catch (error) {
      Console.print(`${error.message}`);
    }
  }
};

export default InputView;
