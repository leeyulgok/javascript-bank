import fs from "fs/promises";
import { Console } from "@woowacourse/mission-utils";

const FILE_PATH = "../json/accounts.json";

export const writeJSONFile = async (account) => {
  try {
    const data = JSON.stringify(account, null, 2);
    await fs.writeFile(FILE_PATH, data, "utf8");
  } catch (error) {
    Console.print(`${error.message}`);
  }
};

export const readJSONFile = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    Console.print(`${error.message}`);
    return [];
  }
};

export const findAccountByNumber = async (accountNumber) => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    const accounts = JSON.parse(data);
    return accounts.find((account) => account.accountNumber === accountNumber);
  } catch (error) {
    Console.print(`${error.message}`);
    return null;
  }
};

export const saveAccount = async (account) => {
  const accounts = await readJSONFile();
  accounts.push({
    userName: account.userName,
    accountNumber: account.accountNumber,
    password: account.password,
    balance: account.balance,
  });
  await writeJSONFile(accounts);
};
