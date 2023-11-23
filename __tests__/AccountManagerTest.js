import Account from "../src/Account";
import AccountManager from "../src/AccountManager";
import InputView from "../src/InputView";
import { findAccountByNumber, saveAccount } from "../src/FileHandler";

jest.mock("../src/InputView");
jest.mock("../src/FileHandler");

describe("AccountManager 테스트", () => {
  const DEFAULT_BALANCE = 0;

  const mockAccountData = [
    {
      userName: "홍길동",
      accountNumber: "123-4567",
      password: "1234",
      balance: DEFAULT_BALANCE,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createAccount: 계좌 생성 테스트", async () => {
    InputView.readUserName.mockResolvedValue("홍길동");
    InputView.readForMakeAccountNumber.mockResolvedValue("123-4567");
    InputView.readUserPassword.mockResolvedValue("password");

    saveAccount.mockResolvedValue();

    const account = await AccountManager.createAccount();

    expect(account).toEqual(expect.any(Account));
    expect(saveAccount).toHaveBeenCalledWith(account);
  });

  test("readAccount: 계좌 읽기 테스트", async () => {
    InputView.readUserAccountNumber.mockResolvedValue("123-4567");

    findAccountByNumber.mockResolvedValue(mockAccountData);

    const account = await AccountManager.readAccount();

    expect(account).toEqual(expect.any(Account));
    expect(findAccountByNumber).toHaveBeenCalledWith("123-4567");
  });
});
