import { validateYesOrNoInput } from "../src/validateInput";

const ERROR_MESSAGE = {
  INVALID_DEFAULT: "[ERROR] 유효하지 않은 입력입니다. 다시 한 번 입력해주세요.",
};

describe("validateInput 단위 테스트", () => {
  test("validateYesOrNoInput: 정상적인 입력 처리", () => {
    expect(validateYesOrNoInput("1")).toBeTruthy();
    expect(validateYesOrNoInput("2")).toBeFalsy();
  });

  test("validateYesOrNoInput: 예외적인 입력 처리", () => {
    expect(() => validateYesOrNoInput("3")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateYesOrNoInput("")).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
    expect(() => validateYesOrNoInput(0)).toThrow(ERROR_MESSAGE.INVALID_DEFAULT);
  });
});
