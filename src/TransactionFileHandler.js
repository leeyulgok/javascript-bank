import fs from "fs/promises";
import { Console } from "@woowacourse/mission-utils";

const FILE_PATH = "../json/transactions.json";

const readTransactions = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    let transactions = JSON.parse(data);

    if (Array.isArray(transactions)) {
      transactions = {};
    }

    return transactions;
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    } else {
      throw error;
    }
  }
};

const writeTransactions = async (transactions) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(transactions, null, 2));
};

const checkRemittance = (transaction, transactionType, transactions) => {
  let newTransaction = {};

  if (transactionType !== "송금") {
    newTransaction = {
      [transactionType]: transaction.money,
      잔고: transaction.account.balance,
    };
  } else {
    newTransaction = {
      [transactionType]: transaction.money,
      계좌: transaction.targetAccountNumber,
    };
    
    if (!transactions[transaction.targetAccountNumber]) {
      transactions[transaction.targetAccountNumber] = [];
    }
    transactions[transaction.targetAccountNumber].push({
      입금: transaction.money,
      계좌: transaction.account.accountNumber,
    });
  }

  return newTransaction;
};

const recordTransaction = async (transaction, transactionType) => {
  try {
    let transactions = await readTransactions();

    if (!transactions[transaction.account.accountNumber]) {
      transactions[transaction.account.accountNumber] = [];
    }

    const newTransaction = checkRemittance(transaction, transactionType, transactions);

    transactions[transaction.account.accountNumber].push(newTransaction);

    await writeTransactions(transactions);
  } catch (error) {
    Console.print(`${error.message}`);
  }
};

export const recordDeposit = async (transaction) => {
  await recordTransaction(transaction, "입금");
};

export const recordWithdraw = async (transaction) => {
  await recordTransaction(transaction, "출금");
};

export const recordRemittance = async (transaction) => {
  await recordTransaction(transaction, "송금");
};

export const findTransactionByAccountNumber = async (accountNumber) => {
  try {
    const transactions = await readTransactions();

    if (!transactions[accountNumber] || transactions[accountNumber].length === 0) {
      Console.print(`거래 내역이 없습니다: ${accountNumber}`);
      return [];
    }

    const accountTransactions = transactions[accountNumber];
    return accountTransactions.slice(-10).reverse();
  } catch (error) {
    Console.print(`거래 내역 조회 중 오류 발생: ${error.message}`);
    return [];
  }
};
