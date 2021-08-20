const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const MIN_YEAR = 1900;

const getDaysInMonth = (month, leapYear) => ({
  1: 31,
  2: leapYear ? 29 : 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
}[month]);

const askUser = async (question) => new Promise(resolve => rl.question(`${question}\n`, resolve));

const isLeapYear = (year) => ( (year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0);

const tryParseInt = (str) => {
  const num = (+ str);
  if(num % 1 === 0) {
    return num;
  }
  throw Error("Dates must contain valid numbers");
} 

const getValidYear = (yearString) => {
  const year = parseInt(yearString);
  if(year >= 1900 && year <= 2999) {
    return year;
  }
  return 0;
}

const getValidMonth = (monthString) => {
  const month = parseInt(monthString);
  if(month >= 1 && month <= 12) {
    return month;
  }
  return 0;
}

const getValidDay = (dayString, month, year) => {
  const day = parseInt(dayString);
  const daysInMonth = getDaysInMonth(month, isLeapYear(year));

  if(day >= 1 && day <= daysInMonth) {
    return day;
  }
  return 0;
}

const isDate = (str) => {
  const parts = str.split("/");

  if(parts.length !== 3) {
    return false;
  }

  let year = getValidYear(parts[2]);
  let month = getValidMonth(parts[1])
  let day = getValidDay(parts[0], month, year);
  return { day, month, year };
};

const dateToDays = (date) => {
  const { day, month, year } = date;
  const leapYear = isLeapYear(year);
  let days = 0;

  for(let i = MIN_YEAR; i < year; i++) {
    days += isLeapYear(i) ? 366 : 365;
  }
  for(let i = 1; i < month; i++) {
    days += getDaysInMonth(i, leapYear);
  }

  return days + day;
};

const run = async () => {

  while(true) {
    const [fromString, toString] = (await askUser("Please enter two dates...")).split(" ");
    const from = isDate(fromString);
    const to = isDate(toString);
    console.log({from, to});

    if(from.year === to.year) {
      if(from.month === to.month) {
        if(from.day >= to.day) {
          console.log("First date must be earlier than second date"); 
        }
      } else if (from.month > to.month) {
        console.log("First date must be earlier than second date"); 
      }
    }

    const fromDays = dateToDays(from);
    const toDays = dateToDays(to);
    console.log({fromDays, toDays});

    console.log("result", toDays - fromDays);
  }

};

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

run();

// dd/mm/yyyy

// 01/01/1900 - 31/12/2999
