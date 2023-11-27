import Account from "../src/Account.js";
import AccountManager from "../src/AccountManager.js";
import InputView from "../src/InputView.js";
import { saveAccount } from "../src/AccountFileHandler.js";

jest.mock("../src/InputView.js");
jest.mock("../src/AccountFileHandler.js", () => ({
  findAccountByNumber: jest.fn(),
  saveAccount: jest.fn(),
}));

describe("AccountManager 테스트", () => {
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
  
    const account = await AccountManager.readAccount();
    
    expect(account).toEqual(expect.any(Account));
  });
});
