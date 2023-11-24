const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
  INVALID_MONEY: "[ERROR] 유효하지 않은 금액입니다. 다시 한 번 입력해주세요.",
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
