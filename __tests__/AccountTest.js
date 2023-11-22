import Account from "../src/Account";

describe("Account 클래스 단위 테스트", () => {
  const userName = "홍길동";
  const accountNumber = "123-4567";
  const password = "1234";
  const balance = 10000;

  let account;

  beforeEach(() => {
    account = new Account(userName, accountNumber, password, balance);
  });

  test("Account 불러오기", () => {
    expect(account).toBeInstanceOf(Account);
  });

  test("새로운 Account 인스턴스 생성 시 속성이 올바르게 할당되는지 확인", () => {
    expect(account.UserName).toBe(userName);
    expect(account.accountNumber).toBe(accountNumber);
    expect(account.password).toBe(password);
    expect(account.balance).toBe(balance);
  });

  test("잔고에 입금하기: 정상적인 입금", () => {
    const money = 10000;
    account.depositBalance(money);

    expect(account.balance).toBe(20000);
  });

  test("올바르지 않은 값 입력", () => {
    const INVALID_WITHDRAW = "[ERROR] 입력한 값이 올바르지 않습니다.";
    const money = "money";

    expect(() => account.depositBalance(money)).toThrow(INVALID_WITHDRAW);
    expect(() => account.withdrawBalance(money)).toThrow(INVALID_WITHDRAW);
  });

  test("잔고 출금하기: 정상적인 출금", () => {
    const money = 10000;
    account.withdrawBalance(money);

    expect(account.balance).toBe(0);
  });

  test("잔고 출금하기: 비정상적인 출금", () => {
    const INVALID_WITHDRAW = "[ERROR] 출금하려는 금액이 더 많습니다.";
    const money = 30000;

    expect(() => account.withdrawBalance(money)).toThrow(INVALID_WITHDRAW);
  });

  test("잔고 출금하기: 경계값 출금", () => {
    const money = 10000;
    account.withdrawBalance(money);

    expect(account.balance).toBe(0);
  });
});
