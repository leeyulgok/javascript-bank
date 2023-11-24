import { findAccountByNumber } from "./FileHandler.js";

const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_ACCOUNT_NUMBER: "[ERROR] 유효하지 않은 계좌번호입니다. 다시 한 번 입력해주세요.",
  INVALID_DUPLI_ACCOUNT_NUMBER: "[ERROR] 이미 존재하는 계좌번호입니다. 다른 계좌번호로 입력해주세요.",
  INVALID_NOT_EXISTS_ACCOUNT: "[ERROR] 존재하지 않는 계좌입니다. 다시 한 번 확인해주세요.",
};

export const validateUserName = (input) => {
  const regex = /^[가-힣]{2,10}$/;

  if (!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }

  return input;
};

export const validateAccountNumber = (input) => {
  // 정규 표현식: 총 7자리, 3자리-4자리 형식, 첫 숫자는 0이 아님, 연속 숫자 3자리 이상 불가
  // ^[1-9]는 첫 숫자가 0이 아닌 1~9 중 하나로 시작해야 함을 의미.
  // (?!.*(.)\1{2})는 같은 숫자가 연속으로 세 번 이상 반복되지 않도록 함.
  // \d{2}-\d{4}$는 2자리 숫자-4자리 숫자 형식으로 끝나야 함을 의미.
  const regex = /^(?!.*(.)\1{2})[1-9]\d{2}-\d{4}$/;

  if (!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
  }

  return input;
};

export const validatePassword = (input) => {
  const regex = /^\d{4}$/;

  if (!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }

  return input;
};

export const checkDuplicationAccountNumber = async (accountNumber) => {
  const accontExists = await findAccountByNumber(accountNumber);

  if (accontExists) {
    throw new Error(ERROR_MESSAGE.INVALID_DUPLI_ACCOUNT_NUMBER);
  }

  return accountNumber;
};

export const checkExistsAccount = async (accountNumber, selfAccount) => {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new Error(ERROR_MESSAGE.INVALID_NOT_EXISTS_ACCOUNT);
  }

  if(selfAccount && selfAccount.accountNumber === account.accountNumber) {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }

  return account;
};

export const validateProgressNumber = (input) => {
  const regex = /^[123459]$/;

  if(!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }

  return input;
};
