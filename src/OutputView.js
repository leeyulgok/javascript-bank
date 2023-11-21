import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 가상 은행입니다.",
  CREATE_ACCOUNT: "\n<계좌개설>",
}

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  },

  printCreateAccount() {
    Console.print(DEFAULT_MESSAGE.CREATE_ACCOUNT);
  }
}

export default OutputView;