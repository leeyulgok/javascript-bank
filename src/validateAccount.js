import { findAccountByNumber } from "./AccountFileHandler.js";
import ERROR_MESSAGE from "../constants/ErrorMessages.js";

const validateWithRegex = (regex, input, msg) => {
  if (!regex.test(input)) {
    throw new Error(msg);
  }

  return input;
}

export const validateUserName = (input) => {
  const regex = /^[가-힣]{2,10}$/;

  return validateWithRegex(regex, input, ERROR_MESSAGE.INVALID_DEFAULT);
};

export const validateAccountNumber = (input) => {
  // 정규 표현식: 총 7자리, 3자리-4자리 형식, 첫 숫자는 0이 아님, 연속 숫자 3자리 이상 불가
  // ^[1-9]는 첫 숫자가 0이 아닌 1~9 중 하나로 시작해야 함을 의미.
  // (?!.*(.)\1{2})는 같은 숫자가 연속으로 세 번 이상 반복되지 않도록 함.
  // \d{2}-\d{4}$는 2자리 숫자-4자리 숫자 형식으로 끝나야 함을 의미.
  const regex = /^(?!.*(.)\1{2})[1-9]\d{2}-\d{4}$/;

  return validateWithRegex(regex, input, ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
};

export const validatePassword = (input) => {
  const regex = /^\d{4}$/;

  return validateWithRegex(regex, input, ERROR_MESSAGE.INVALID_DEFAULT);
};

export const validateProgressNumber = (input) => {
  const regex = /^[123459]$/;

  return validateWithRegex(regex, input, ERROR_MESSAGE.INVALID_DEFAULT);
};

export const checkDuplicationAccountNumber = async (accountNumber) => {
  const accontExists = await findAccountByNumber(accountNumber);

  if (accontExists) {
    throw new Error(ERROR_MESSAGE.INVALID_DUPLI_ACCOUNT_NUMBER);
  }

  return accountNumber;
};

export const checkExistsAccount = async (accountNumber, selfAccount) => {
  const account = await checkAccountExists(accountNumber);
  checkIfSameAccount(account, selfAccount);

  return accountNumber;
};

export const checkAccountExists = async (accountNumber) => {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new Error(ERROR_MESSAGE.INVALID_NOT_EXISTS_ACCOUNT);
  }

  return account;
};

export const checkIfSameAccount = (account1, account2) => {
  if (account1 && account2 && account1.accountNumber === account2.accountNumber) {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }
};
