import { Console } from "@woowacourse/mission-utils";
import {
  validateUserName,
  validateAccountNumber,
  validatePassword,
  checkDuplicationAccountNumber,
  checkExistsAccount,
  validateProgressNumber,
} from "./validateAccount.js";
import { validateYesOrNoInput, validateMoney, validateWithdraw } from "./validateInput.js";

const CONSOLE_MESSAGE = {
  EXISTS_ACCOUNT: "계좌가 존재하신가요(2를 누를 경우, 자동으로 계좌 개설로 넘어갑니다.)?\n예-1,아니요-2\n",
  USER_NAME: "이름을 입력해주세요.\n",
  CREATE_USER_ACCOUNT_NUMBER: "\n생성하고 싶은 계좌번호를 입력해주세요(eg. 123-4567).\n",
  READ_USER_ACCOUNT_NUMBER: "\n계좌번호를 입력해주세요(eg. 123-4567).\n",
  USER_PASSWORD: "\n비밀번호 4자리를 입력해주세요.\n",
  CONTINUE: "계속 거래를 진행하시겠습니까?\n예-1,아니요-2\n",
  PROGRESS_NUMBER: "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9\n",
  DEPOSIT: "\n<입금>\n입금할 금액을 입력해주세요.\n",
  WITHDRAW: "\n<출금>\n출금할 금액을 입력해주세요.\n",
  PASSWORD: "\n<비밀번호>\n비밀번호를 입력해주세요.\n",
};

const InputView = {
  async readExistsAccount() {
    return readInput(CONSOLE_MESSAGE.EXISTS_ACCOUNT, validateYesOrNoInput);
  },

  async readUserName() {
    return readInput(CONSOLE_MESSAGE.USER_NAME, validateUserName);
  },

  async readForMakeAccountNumber() {
    return readInput(
      CONSOLE_MESSAGE.CREATE_USER_ACCOUNT_NUMBER,
      validateAccountNumber,
      checkDuplicationAccountNumber
    );
  },

  async readUserPassword() {
    return readInput(CONSOLE_MESSAGE.USER_PASSWORD, validatePassword);
  },

  async readContinueTransaction() {
    return readInput(CONSOLE_MESSAGE.CONTINUE, validateYesOrNoInput);
  },

  async readUserAccountNumber() {
    return readInput(
      CONSOLE_MESSAGE.READ_USER_ACCOUNT_NUMBER,
      validateAccountNumber,
      checkExistsAccount
    );
  },

  async readProgressNumber() {
    return readInput(CONSOLE_MESSAGE.PROGRESS_NUMBER, validateProgressNumber);
  },

  async readDepositMoney() {
    return readInput(CONSOLE_MESSAGE.DEPOSIT, validateMoney);
  },

  async readWithdrawMoney(account) {
    return readInput(CONSOLE_MESSAGE.WITHDRAW, validateMoney, validateWithdraw, account);
  },

  async readPassword() {
    return readInput(CONSOLE_MESSAGE.PASSWORD, validatePassword);
  },
};

const readInput = async (msg, fn, secondFn, account) => {
  let firstAttempt = true;

  while (true) {
    try {
      const input = await Console.readLineAsync(firstAttempt ? msg : "");
      firstAttempt = false;
      
      if (secondFn) {
        return await secondFn(fn(input), account);
      };

      return fn(input);
    } catch (error) {
      Console.print(`${error.message}`);
    }
  }
};

export default InputView;
