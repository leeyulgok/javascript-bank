import { Console } from "@woowacourse/mission-utils";
import { formatTransaction } from "./format.js";
import OUTPUT_MESSAGE from "../constants/OutputMessages.js";

const OutputView = {
  printHello() {
    Console.print(OUTPUT_MESSAGE.HELLO);
  },

  printCreateAccount() {
    Console.print(OUTPUT_MESSAGE.CREATE_ACCOUNT);
  },

  printSuccessAccount() {
    Console.print(OUTPUT_MESSAGE.SUCCESS_ACCOUNT);
  },

  printProgress() {
    Console.print(OUTPUT_MESSAGE.PROGRESS);
  },

  printExit() {
    Console.print(OUTPUT_MESSAGE.EXIT);
  },

  printBalance(accont) {
    Console.print(OUTPUT_MESSAGE.BALANCE);
    Console.print(`${accont.userName}님의 잔고는\n${accont.balance}원입니다.\n`);
  },

  printInquiry(length) {
    Console.print(OUTPUT_MESSAGE.INQUIRY);
    Console.print(`최근 ${length}건의 거래내역을 조회합니다.\n`);
  },

  printTransaction(transaction, index) {
    Console.print(`${index + 1}. ${formatTransaction(transaction)}\n`);
  },
}

export default OutputView;