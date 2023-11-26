import { Console } from "@woowacourse/mission-utils";
import { formatTransaction } from "./format.js";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 가상 은행입니다.",
  CREATE_ACCOUNT: "\n<계좌개설>",
  SUCCESS_ACCOUNT: "\n계좌개설에 성공했습니다.",
  PROGRESS: "\n진행하려는 사항을 입력해주세요.",
  BALANCE: "\n<잔고>",
  INQUIRY: "\n<거래조회>",
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

  printBalance(accont) {
    Console.print(DEFAULT_MESSAGE.BALANCE);
    Console.print(`${accont.userName}님의 잔고는\n${accont.balance}원입니다.\n`);
  },

  printInquiry(length) {
    Console.print(DEFAULT_MESSAGE.INQUIRY);
    Console.print(`최근 ${length}건의 거래내역을 조회합니다.\n`);
  },

  printTransaction(transaction, index) {
    Console.print(`${index + 1}. ${formatTransaction(transaction)}\n`);
  },
}

export default OutputView;