import {
  writeJSONFile,
  readJSONFile,
  findAccountByNumber,
} from "../src/FileHandler.js";
import fs from "fs/promises";

jest.mock("fs/promises");

describe("FileHandler 단위 테스트", () => {
  const mockData = [
    {
      userName: "홍길동",
      accountNumber: "123-4567",
      password: "1234",
      balancer: 10000,
    },
    {
      userName: "김갑수",
      accountNumber: "456-7890",
      password: "1111",
      balancer: 50000,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("writeJSONFile: 파일 쓰기 테스트", async () => {
    fs.writeFile.mockResolvedValue();
    await writeJSONFile(mockData);
    expect(fs.writeFile).toHaveBeenCalledWith(expect.any(String), JSON.stringify(mockData, null, 2), "utf8");
  });

  test("readJSONFile: 파일 읽기 테스트", async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));
    const data = await readJSONFile();
    expect(data).toEqual(mockData);
  });

  test("findAccountByNumber: 특정 계좌 검색 테스트", async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));
    const account = await findAccountByNumber("123-4567");
    expect(account).toEqual(mockData[0]);
  });
});
