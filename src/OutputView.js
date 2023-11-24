import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 가상 은행입니다.",
  CREATE_ACCOUNT: "\n<계좌개설>",
  SUCCESS_ACCOUNT: "\n계좌개설에 성공했습니다.",
  PROGRESS: "\n진행하려는 사항을 입력해주세요.",
  EXIT: "\n거래를 종료합니다.",
};

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  },

  printCreateAccount() {
    Console.print(DEFAULT_MESSAGE.CREATE_ACCOUNT);
  },

  printSuccessAccount() {
    Console.print(DEFAULT_MESSAGE.SUCCESS_ACCOUNT);
  },

  printProgress() {
    Console.print(DEFAULT_MESSAGE.PROGRESS);
  },

  printExit() {
    Console.print(DEFAULT_MESSAGE.EXIT);
  },
}

export default OutputView;