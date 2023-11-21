import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("가상 은행 프로그램 기능 테스트", () => {
  test("계좌 생성 테스트", async () => {
    // given
    mockQuestions(["2", "이대한", "123-4567", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "<계좌개설>",
      "이름을 입력해주세요.",
      "생성하고 싶은 계좌번호를 입력해주세요(eg. 123-4567).",
      "비밀번호 4자리를 입력해주세요.",
      "계좌개설에 성공했습니다.",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });

  test("입금 테스트", async () => {
    // given
    mockQuestions(["1", "123-4567", "1", "10000", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "진행하려는 사항을 입력해주세요.",
      "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9",
      "1",
      "<입금>",
      "<잔고>",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });

  test("출금 테스트", async () => {
    // given
    mockQuestions(["1", "123-4567", "2", "10000", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "진행하려는 사항을 입력해주세요.",
      "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9",
      "2",
      "<출금>",
      "<비밀번호>",
      "<잔고>",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });

  test("송금 테스트", async () => {
    // given
    mockQuestions(["1", "123-4567", "3", "123-4567", "10000", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "진행하려는 사항을 입력해주세요.",
      "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9",
      "3",
      "<송금>",
      "<금액>",
      "<비밀번호>",
      "송금을 완료했습니다.",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });

  test("거래조회 테스트", async () => {
    // given
    mockQuestions(["1", "123-4567", "4", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "진행하려는 사항을 입력해주세요.",
      "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9",
      "4",
      "<거래조회>",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });

  test("잔고 테스트", async () => {
    // given
    mockQuestions(["1", "123-4567", "5", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logSpy = getLogSpy();
    const expectedOutputs = [
      "진행하려는 사항을 입력해주세요.",
      "입금-1,출금-2,송금-3,거래조회-4,잔고-5,종료-9",
      "5",
      "<비밀번호>",
      "<잔고>",
    ];

    expectLogContains(getOutput(logSpy), expectedOutputs);
  });
});

describe("예외 테스트", () => {
  test("계좌번호 예외 테스트", async () => {
    // given
    const INVALID_ACCOUNT_MESSAGE = "[ERROR] 유효하지 않은 계좌번호입니다. 다시 입력해 주세요.";
    const logSpy = getLogSpy();
    mockQuestions(["1", "12-34567", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ACCOUNT_MESSAGE)
    );
  });

  test("입금 예외 테스트", async () => {
    // given
    const INVALID_ACCOUNT_MESSAGE = "[ERROR] 유효하지 않은 금액입니다. 다시 입력해 주세요.";
    const logSpy = getLogSpy();
    mockQuestions(["2", "123-4567", "1", "-10000", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ACCOUNT_MESSAGE)
    );
  });

  test("출금 예외 테스트", async () => {
    // given
    const INVALID_ACCOUNT_MESSAGE = "[ERROR] 유효하지 않은 금액입니다. 다시 입력해 주세요.";
    const logSpy = getLogSpy();
    mockQuestions(["2", "123-4567", "2", "-10000", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ACCOUNT_MESSAGE)
    );
  });

  test("송금 예외 테스트", async () => {
    // given
    const INVALID_ACCOUNT_MESSAGE = "[ERROR] 유효하지 않은 금액입니다. 다시 입력해 주세요.";
    const logSpy = getLogSpy();
    mockQuestions(["2", "123-4567", "3", "123-4567", "-10000", "1234", "2"]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ACCOUNT_MESSAGE)
    );
  });
});
