const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요."
}

export const validateIsExistsAccount = (input) => {
  if(input === "1") {
    return true;
  } else if (input === "2") {
    return false;
  } else {
    throw new Error(ERROR_MESSAGE.INVALID_DEFAULT);
  }
};