const { UserInterface } = require("../userInterface");
const readline = require('readline');

jest.mock("readline");

describe("standardizeUserInput", () => {
  const standardizedOutput = "1/1/2021 2/2/2021";
  const userInterface = new UserInterface();

  test('Dates with space', () => expect(userInterface.standardizeUserInput('1/1/2021 2/2/2021')).toBe(standardizedOutput));
  test('Dates with "to"', () => expect(userInterface.standardizeUserInput('1/1/2021 to 2/2/2021')).toBe(standardizedOutput));
  test('Dates with "-"', () => expect(userInterface.standardizeUserInput('1/1/2021 - 2/2/2021')).toBe(standardizedOutput));
  test('Dates with "and"', () => expect(userInterface.standardizeUserInput('1/1/2021 and 2/2/2021')).toBe(standardizedOutput));
  test('Dates with leading & trailing spaces', () => expect(userInterface.standardizeUserInput('  1/1/2021 and   2/2/2021    ')).toBe(standardizedOutput));
});

describe("promptUser", () => {
  // See __mocks__/readline.js for the mocked readline.question() output
  const standardizedOutput = "1/1/2021 2/2/2021";
  const userInterface = new UserInterface();

  test('Dates with space', async () => {
    const result = await userInterface.promptUser();
    expect(result).toBe(standardizedOutput);
  });

  test('Dates with "to"', async () => {
    const result = await userInterface.promptUser();
    expect(result).toBe(standardizedOutput);
  });
  
  test('Dates with "-"', async () => {
    const result = await userInterface.promptUser();
    expect(result).toBe(standardizedOutput);
  });

  test('Dates with "and"', async () => {
    const result = await userInterface.promptUser();
    expect(result).toBe(standardizedOutput);
  });

  test('Dates with leading & trailing spaces', async () => {
    const result = await userInterface.promptUser();
    expect(result).toBe(standardizedOutput);
  });
});