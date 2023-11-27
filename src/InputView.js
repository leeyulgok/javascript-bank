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
import INPUT_MESSAGE from "../constants/InputMessages.js";

const InputView = {
  async readExistsAccount() {
    return processInput(INPUT_MESSAGE.EXISTS_ACCOUNT, [validateYesOrNoInput]);
  },

  async readUserName() {
    return processInput(INPUT_MESSAGE.USER_NAME, [validateUserName]);
  },

  async readForMakeAccountNumber() {
    return processInput(
      INPUT_MESSAGE.CREATE_USER_ACCOUNT_NUMBER,
      [validateAccountNumber, checkDuplicationAccountNumber]
    );
  },

  async readUserPassword() {
    return processInput(INPUT_MESSAGE.USER_PASSWORD, [validatePassword]);
  },

  async readContinueTransaction() {
    return processInput(INPUT_MESSAGE.CONTINUE, [validateYesOrNoInput]);
  },

  async readUserAccountNumber() {
    return processInput(
      INPUT_MESSAGE.READ_USER_ACCOUNT_NUMBER, [validateAccountNumber, checkExistsAccount]
    );
  },

  async readProgressNumber() {
    return processInput(INPUT_MESSAGE.PROGRESS_NUMBER, [validateProgressNumber]);
  },

  async readDepositMoney() {
    return processInput(INPUT_MESSAGE.DEPOSIT, [validateMoney]);
  },

  async readWithdrawMoney(account) {
    return processInput(INPUT_MESSAGE.WITHDRAW, [validateMoney, validateWithdraw], account);
  },

  async readPassword() {
    return processInput(INPUT_MESSAGE.PASSWORD, [validatePassword]);
  },

  async readRemittanceAccount(account) {
    return processInput(INPUT_MESSAGE.REMITTANCE, [validateAccountNumber, checkExistsAccount], account);
  },

  async readRemittanceMoney(account) {
    return processInput(INPUT_MESSAGE.MONEY, [validateMoney, validateWithdraw], account);
  },
};

const readInput = async (msg) => {
  const input = await Console.readLineAsync(msg);
  
  return input;
};

const validateInput = (input, fnArray, additionalArg) => {
  fnArray.forEach(fn => (
    fn(input, additionalArg)
  ));

  return input;
};

const processInput = async (msg, fnArray, additionalArg) => {
  let firstAttempt = true;
  while (true) {
    const input = await readInput(firstAttempt ? msg : "");
    try {
      return validateInput(input, fnArray, additionalArg);
    } catch (error) {
      Console.print(`${error.message}`);
      firstAttempt = false;
    }
  }
};

export default InputView;
