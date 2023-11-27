const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_MONEY: "[ERROR] 유효하지 않은 금액입니다. 다시 한 번 입력해주세요.",
  INVALID_WITHDRAW: "[ERROR] 출금하려는 금액이 더 많습니다.",
};

export const validateYesOrNoInput = (input) => {
  if (input === "1") {
    return true;
  } else if (input === "2") {
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
