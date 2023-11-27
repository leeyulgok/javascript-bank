import { validateYesOrNoInput, validateMoney, validateWithdraw } from "../src/validateInput";
import Account from "../src/Account.js";

const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_MONEY: "[ERROR] 유효하지 않은 금액입니다. 다시 한 번 입력해주세요.",
  INVALID_WITHDRAW: "[ERROR] 출금하려는 금액이 더 많습니다.",
};

describe("validateInput 단위 테스트", () => {
  const userName = "홍길동";
  const accountNumber = "123-4567";
  const password = "1234";
  const balance = 1000;

  let account;

  beforeEach(() => {
    account = new Account(userName, accountNumber, password, balance);
  });

  test("validateYesOrNoInput: 정상적인 입력 처리", () => {
    expect(validateYesOrNoInput("1")).toBeTruthy();
    expect(validateYesOrNoInput("2")).toBeFalsy();
  });

  test("validateYesOrNoInput: 예외적인 입력 처리", () => {
    expect(() => validateYesOrNoInput("3")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateYesOrNoInput("")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateYesOrNoInput(0)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("validateMoney: 정상적인 입력 처리", () => {
    expect(validateMoney(10000)).toBe(10000);
    expect(validateMoney(9000)).toBe(9000);
    expect(validateMoney(100)).toBe(100);
  });

  test("validateMoney: 예외적인 입력 처리", () => {
    expect(() => validateMoney(0)).toThrow(ERROR_MESSAGE.INVALID_MONEY);
    expect(() => validateMoney(-1123)).toThrow(ERROR_MESSAGE.INVALID_MONEY);
    expect(() => validateMoney()).toThrow(ERROR_MESSAGE.INVALID_MONEY);
  });

  test("validateWithdraw: 정상적인 입력 처리", () => {
    expect(validateWithdraw(1000, account)).toBe(1000);
    expect(validateWithdraw(1, account)).toBe(1);
    expect(validateWithdraw(500, account)).toBe(500);
  });

  test("validateWithdraw: 예외적인 입력 처리", () => {
    expect(() => validateWithdraw(10001, account)).toThrow(ERROR_MESSAGE.INVALID_WITHDRAW);
    expect(() => validateWithdraw(100000, account)).toThrow(ERROR_MESSAGE.INVALID_WITHDRAW);
    expect(() => validateWithdraw(100000000, account)).toThrow(ERROR_MESSAGE.INVALID_WITHDRAW);
  });
});
