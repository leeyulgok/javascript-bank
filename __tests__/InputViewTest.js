import InputView from "../src/InputView.js";
import { Console } from "@woowacourse/mission-utils";

const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_ACCOUNT_NUMBER: "[ERROR] 유효하지 않은 계좌번호입니다. 다시 한 번 입력해주세요.",
};

jest.mock("@woowacourse/mission-utils", () => ({
  Console: {
    readLineAsync: jest.fn(),
    print: jest.fn(),
  },
}));

describe("InputView 단위 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("readUserName: 정상적인 이름 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("홍길동");
    const uesrName = await InputView.readUserName();

    expect(uesrName).toBe("홍길동");
  });

  test("readUserName: 예외적인 이름 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("hong");
    await expect(InputView.readUserName()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("readExistsAccount: 정상적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1");
    const isTrue = await InputView.readExistsAccount()
    expect(isTrue).toBeTruthy();

    Console.readLineAsync.mockResolvedValueOnce("2");
    const isFalse = await InputView.readExistsAccount()
    expect(isFalse).toBeFalsy();
  });

  test("readExistsAccount: 예외적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("3");
    await expect(InputView.readExistsAccount()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);

    Console.readLineAsync.mockResolvedValueOnce("");
    await expect(InputView.readExistsAccount()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);

    Console.readLineAsync.mockResolvedValueOnce("b");
    await expect(InputView.readExistsAccount()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("readForMakeAccountNumber: 정상적인 계좌번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("123-4567");
    const accountNumber = await InputView.readForMakeAccountNumber();

    expect(accountNumber).toBe("123-4567");
  });

  test("readForMakeAccountNumber: 예외적인 계좌번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1234567");
    await expect(InputView.readForMakeAccountNumber()).rejects.toThrow(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
  });

  test("readUserPassword: 정상적인 비밀번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1234");
    const password = await InputView.readUserPassword();

    expect(password).toBe("1234");
  });

  test("readUserPassword: 예외적인 비밀번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("abcd");
    await expect(InputView.readUserPassword()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("readContinueTransaction: 정상적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1");
    const continueTransaction = await InputView.readContinueTransaction();

    expect(continueTransaction).toBeTruthy();

    Console.readLineAsync.mockResolvedValueOnce("2");
    const stopTransaction = await InputView.readContinueTransaction();

    expect(stopTransaction).toBeFalsy();
  });

  test("readContinueTransaction: 예외적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("3");
    await expect(InputView.readContinueTransaction()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);

    Console.readLineAsync.mockResolvedValueOnce("");
    await expect(InputView.readContinueTransaction()).rejects.toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });

  test("readUserAccountNumber: 정상적인 계좌번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("987-6543");
    const accountNumber = await InputView.readUserAccountNumber();

    expect(accountNumber).toBe("987-6543");
  });

  test("readUserAccountNumber: 예외적인 계좌번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("9876543");
    await expect(InputView.readUserAccountNumber()).rejects.toThrow(ERROR_MESSAGE.INVALID_ACCOUNT_NUMBER);
  });
});
