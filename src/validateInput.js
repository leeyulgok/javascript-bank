import ERROR_MESSAGE from "../constants/ErrorMessages.js";

export const validateYesOrNoInput = (input) => {
  const YES = "1";
  const NO = "2";

  if (input === YES) {
    return true;
  } else if (input === NO) {
    return false;
  } else {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }
};

export const validateMoney = (input) => {
  const money = parseInt(input, 10);

  if(isNaN(money) || money <= 0) {
    throw new Error(ERROR_MESSAGE.INVALID_MONEY);
  }

  return money;
};

export const validateWithdraw = (money, account) => {
  if (account.balance < money) {
    throw new Error(ERROR_MESSAGE.INVALID_WITHDRAW);
  }

  return money;
};
