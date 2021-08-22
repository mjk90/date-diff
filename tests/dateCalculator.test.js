const { DateCalculator } = require("../dateCalculator");

const calculator = new DateCalculator();

describe("tryParseDateSegment", () => {
  test('Valid number', () => expect(calculator.tryParseDateSegment("30", 1, 31)).toBe(30));
  test('Invalid number (too high)', () => expect(calculator.tryParseDateSegment("30", 7, 15)).toBe(NaN));
  test('Invalid number (too low)', () => expect(calculator.tryParseDateSegment("3", 7, 15)).toBe(NaN));
  test('Invalid number', () => expect(calculator.tryParseDateSegment("22.5", 1, 31)).toBe(NaN));
  test('Invalid string', () => expect(calculator.tryParseDateSegment("abc")).toBe(NaN));
  test('Empty string', () => expect(calculator.tryParseDateSegment("")).toBe(NaN));
  test('Null', () => expect(calculator.tryParseDateSegment(null)).toBe(NaN));
});

describe("isLeapYear", () => {
  const input = [2000, 2004, 2007, 2012, 2015, 2020, 2021];
  const expected = [true, true, false, true, false, true, false];
  const actual = input.reduce((arr, num) => { arr.push(calculator.isLeapYear(num)); return arr; }, []);
  test('Leap years', () => expect(expected).toEqual(actual));
});

describe("getDaysInMonth", () => {
  test('Month with 31 days', () => expect(calculator.getDaysInMonth(12, false)).toBe(31));
  test('Month with 30 days', () => expect(calculator.getDaysInMonth(9, false)).toBe(30));
  test('Month with 28 days', () => expect(calculator.getDaysInMonth(2, false)).toBe(28));
  test('Month with 29 days', () => expect(calculator.getDaysInMonth(2, true)).toBe(29));
});

describe("getValidYear", () => {
  test('Valid', () => expect(calculator.getValidYear("1990")).toBe(1990));
  test('Invalid (before 1900)', () => expect(calculator.getValidYear("1850")).toBe(NaN));
  test('Invalid (after 2999)', () => expect(calculator.getValidYear("3000")).toBe(NaN));
  test('Invalid (float)', () => expect(calculator.getValidYear("1990.45")).toBe(NaN));
  test('Invalid (not number)', () => expect(calculator.getValidYear("aaa")).toBe(NaN));
});

describe("getValidMonth", () => {
  test('Valid', () => expect(calculator.getValidMonth("4")).toBe(4));
  test('Invalid (0)', () => expect(calculator.getValidMonth("0")).toBe(NaN));
  test('Invalid (negative)', () => expect(calculator.getValidMonth("-1")).toBe(NaN));
  test('Invalid (greater than 12)', () => expect(calculator.getValidMonth("13")).toBe(NaN));
  test('Invalid (not number)', () => expect(calculator.getValidMonth("aaa")).toBe(NaN));
});

describe("getValidDay", () => {
  test('Valid', () => expect(calculator.getValidDay("25", 12, 2021)).toBe(25));
  test('Invalid (0)', () => expect(calculator.getValidDay("0", 12, 2021)).toBe(NaN));
  test('Invalid (negative)', () => expect(calculator.getValidMonth("-1", 12, 2021)).toBe(NaN));
  test('Invalid (greater than 31)', () => expect(calculator.getValidMonth("35")).toBe(NaN));
  test('Invalid (not number)', () => expect(calculator.getValidMonth("aaa")).toBe(NaN));
});

describe("strToDate", () => {
  test('Valid', () => expect(calculator.strToDate("01/01/2021")).toEqual({ day: 1, month: 1, year: 2021 }));
  test('Invalid (Too many segments)', () => expect(calculator.strToDate("01/01/2021/01")).toBe(false));
  test('Invalid (Too few segments)', () => expect(calculator.strToDate("01/1")).toBe(false));
  test('Invalid (empty string)', () => expect(calculator.strToDate("")).toBe(false));
  test('Invalid (non-date string)', () => expect(calculator.strToDate("a/b/c")).toBe(false));
});

describe("dateToDays", () => {
  test('Valid (21/8/2021)', () => expect(calculator.dateToDays({ day: 21, month: 8, year: 2021 })).toEqual(44428));
  test('Valid (1/1/1990)', () => expect(calculator.dateToDays({ day: 1, month: 1, year: 1900 })).toEqual(1));
  test('Valid (31/12/2999)', () => expect(calculator.dateToDays({ day: 31, month: 12, year: 2999 })).toEqual(401767));
  test('Invalid (date segments missing)', () => expect(calculator.dateToDays({ day: 1, year: 2021 })).toEqual(false));
  test('Invalid (date segments invalid)', () => expect(calculator.dateToDays({ day: 1, month: 1, year: "2021" })).toEqual(false));
});

describe("getDaysBetween", () => {
  test("Valid (01/01/2001 to 03/01/2001)", () => expect(calculator.getDaysBetween(["01/01/2001", "03/01/2001"])).toBe(1));
  test("Valid (2/6/1983 to 22/6/1983)", () => expect(calculator.getDaysBetween(["2/6/1983", "22/6/1983"])).toBe(19));
  test("Valid (4/7/1984 to 25/12/1984)", () => expect(calculator.getDaysBetween(["4/7/1984", "25/12/1984"])).toBe(173));  
  test("Valid reversed dates (8/11/2020 to 8/11/1990)", () => expect(calculator.getDaysBetween(["8/11/2020", "8/11/1990"])).toBe(10957));

  test("Invalid (3/1/1989 to 3/8/1983)", () => expect(calculator.getDaysBetween(["3/1/1989", "3/8/1983"])).not.toBe(2036));
  test("Invalid (date too early)", () => expect(() => calculator.getDaysBetween(["4/5/1852", "10/12/1938"])).toThrow("Could not parse date(s): 4/5/1852"));
  test("Invalid (date too late)", () => expect(() => calculator.getDaysBetween(["8/9/2950", "1/4/3030"])).toThrow("Could not parse date(s): 1/4/3030"));
  test("Invalid (date too eary & too late)", () => expect(() => calculator.getDaysBetween(["31/12/1899", "1/1/3000"])).toThrow("Could not parse date(s): 31/12/1899 1/1/3000"));
});