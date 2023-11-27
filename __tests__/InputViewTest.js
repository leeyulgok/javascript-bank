import InputView from "../src/InputView.js";
import { findAccountByNumber } from "../src/AccountFileHandler.js";
import { Console } from "@woowacourse/mission-utils";

jest.mock("@woowacourse/mission-utils", () => ({
  Console: {
    readLineAsync: jest.fn(),
    print: jest.fn(),
  },
}));

jest.mock("../src/AccountFileHandler.js", () => ({
  findAccountByNumber: jest.fn(),
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

  test("readExistsAccount: 정상적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1");
    const isTrue = await InputView.readExistsAccount()
    expect(isTrue).toBeTruthy();

    Console.readLineAsync.mockResolvedValueOnce("2");
    const isFalse = await InputView.readExistsAccount()
    expect(isFalse).toBeFalsy();
  });

  test("readForMakeAccountNumber: 정상적인 계좌번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("123-4567");
    const accountNumber = await InputView.readForMakeAccountNumber();

    expect(accountNumber).toBe("123-4567");
  });

  test("readUserPassword: 정상적인 비밀번호 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1234");
    const password = await InputView.readUserPassword();

    expect(password).toBe("1234");
  });

  test("readContinueTransaction: 정상적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1");
    const continueTransaction = await InputView.readContinueTransaction();

    expect(continueTransaction).toBeTruthy();

    Console.readLineAsync.mockResolvedValueOnce("2");
    const stopTransaction = await InputView.readContinueTransaction();

    expect(stopTransaction).toBeFalsy();
  });

  test("readUserAccountNumber: 정상적인 계좌번호 입력", async () => {
    findAccountByNumber.mockResolvedValue({accountNumber: "987-6543"});
    Console.readLineAsync.mockResolvedValueOnce("987-6543");
    const account = await InputView.readUserAccountNumber();

    expect(account.accountNumber).toBe("987-6543");
  });

  test("readProgressNumber: 정상적인 입력", async () => {
    Console.readLineAsync.mockResolvedValueOnce("1");
    const progressNumber = await InputView.readProgressNumber();

    expect(progressNumber).toBe("1");
  });
});
