import {
  validateIsExistsAccount,
  validateUserName,
  validateAccountNumber,
  validatePassword,
} from "../src/validateAccount.js";

const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_ACCOUNT_NUMBER: "[ERROR] 유효하지 않은 계좌번호입니다. 다시 한 번 입력해주세요.",
};

describe("validateAccount 단위 테스트", () => {
  test("validateIsExistsAccount: 정상적인 입력 처리", () => {
    expect(validateIsExistsAccount("1")).toBeTruthy();
    expect(validateIsExistsAccount("2")).toBeFalsy();
  });

  test("validateIsExistsAccount: 예외적인 입력 처리", () => {
    expect(() => validateIsExistsAccount("3")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateIsExistsAccount("")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateIsExistsAccount(0)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("validateUserName: 정상적인 입력 처리", () => {
    const nameOne = "홍길동";
    const nameTwo = "김군";
    const nameThree = "김수환무거북이";

    expect(validateUserName(nameOne)).toBe(nameOne);
    expect(validateUserName(nameTwo)).toBe(nameTwo);
    expect(validateUserName(nameThree)).toBe(nameThree);
  });

  test("validateUserName: 예외적인 입력 처리", () => {
    const nameOne = "홍 길 동";
    const nameTwo = "";
    const nameThree = "fdafsaf";

    expect(() => validateUserName(nameOne)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateUserName(nameTwo)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateUserName(nameThree)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("validateAccountNumber: 정상적인 입력 처리", () => {
    const accountNumberOne = "123-4567";
    const accountNumberTwo = "113-0567";
    const accountNumberThree = "133-4887";

    expect(validateAccountNumber(accountNumberOne)).toBe(accountNumberOne);
    expect(validateAccountNumber(accountNumberTwo)).toBe(accountNumberTwo);
    expect(validateAccountNumber(accountNumberThree)).toBe(accountNumberThree);
  });

  test("validateAccountNumber: 예외적인 입력 처리", () => {
    const accountNumberOne = "1234567";
    const accountNumberTwo = "012-3456";
    const accountNumberThree = "123-4445";

    expect(() => validateAccountNumber(accountNumberOne)).toThrow(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
    expect(() => validateAccountNumber(accountNumberTwo)).toThrow(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
    expect(() => validateAccountNumber(accountNumberThree)).toThrow(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
  });

  test("validatePassword: 정상적인 입력 처리", () => {
    const passwordOne = "1234";
    const passwordTwo = "5555";
    const passwordThree = "9876";

    expect(validatePassword(passwordOne)).toBe(passwordOne);
    expect(validatePassword(passwordTwo)).toBe(passwordTwo);
    expect(validatePassword(passwordThree)).toBe(passwordThree);
  });

  test("validatePassword: 예외적인 입력 처리", () => {
    const passwordOne = "12455";
    const passwordTwo = "일이삼사";
    const passwordThree = "01 3";

    expect(() => validatePassword(passwordOne)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validatePassword(passwordTwo)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validatePassword(passwordThree)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });
});
