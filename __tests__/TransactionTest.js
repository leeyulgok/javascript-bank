import Transaction from "../src/Transaction";
import Account from "../src/Account";

describe("Transaction 단위 테스트", () => {
  const TRANSACTION_TYPE = {
    DEPOSIT: "입금",
    WITHDRAW: "출금",
    REMITTANCE: "송금"
  };

  const userName = "홍길동";
  const accountNumber = "123-4567";
  const password = "1234";
  const balance = 10000;

  let account;

  beforeEach(() => {
    account = new Account(userName, accountNumber, password, balance);
  });

  test("Transaction 인스턴스 생성: 입금 타입", () => {
    const money = 10000;
    const transcation = new Transaction(account, TRANSACTION_TYPE.DEPOSIT, money);

    expect(transcation).toBeInstanceOf(Transaction);
    expect(transcation.account).toBeInstanceOf(Account);
    expect(transcation.transactionType).toBe(TRANSACTION_TYPE.DEPOSIT);
    expect(transcation.money).toBe(money);
    expect(transcation.targetAccountNumber).toBe(undefined);
  });

  test("Transaction 인스턴스 생성: 출금 타입", () => {
    const money = 10000;
    const transcation = new Transaction(account, TRANSACTION_TYPE.WITHDRAW, money);

    expect(transcation.transactionType).toBe(TRANSACTION_TYPE.WITHDRAW);
  });

  test("Transaction 인스턴스 생성: 송금 타입", () => {
    const money = 10000;
    const targetAccountNumber = "321-4543";
    const transcation = new Transaction(account, TRANSACTION_TYPE.REMITTANCE, money, targetAccountNumber);

    expect(transcation.transactionType).toBe(TRANSACTION_TYPE.REMITTANCE);
    expect(transcation.targetAccountNumber).toBe(targetAccountNumber);
  });
});
