import { Console } from "@woowacourse/mission-utils";
import {
  validateIsExistsAccount,
  validateUserName,
  validateAccountNumber,
  validatePassword,
} from "./validateAccount.js";

const CONSOLE_MESSAGE = {
  EXISTS_ACCOUNT: "계좌가 존재하신가요(2를 누를 경우, 자동으로 계좌 개설로 넘어갑니다.)?\n",
  USER_NAME: "이름을 입력해주세요.\n",
  USER_ACCOUNT: "\n생성하고 싶은 계좌번호를 입력해주세요(eg. 123-4567).\n",
  USER_PASSWORD: "\n비밀번호 4자리를 입력해주세요.\n",
};

const InputView = {
  async readExistsAccount() {
    return readInput(CONSOLE_MESSAGE.EXISTS_ACCOUNT, validateIsExistsAccount);
  },

  async readUserName() {
    return readInput(CONSOLE_MESSAGE.USER_NAME, validateUserName);
  },

  async readUserAccoint() {
    return readInput(CONSOLE_MESSAGE.USER_ACCOUNT, validateAccountNumber);
  },

  async readUserPassword() {
    return readInput(CONSOLE_MESSAGE.USER_PASSWORD, validatePassword);
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
