import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 가상 은행입니다.",
}

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  }
}

export default OutputView;