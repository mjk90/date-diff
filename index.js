const { UserInterface } = require('./userInterface');
const { DateCalculator } = require("./dateCalculator");

const helpText = `
  When using this application, you will be prompted to enter two dates (must be in dd/mm/yyyy format).
  You can enter these two dates seperated by any combination of space, "-", "to" or "and".
  For example "01/01/2001 03/01/2001", "2/6/1983 to 22/6/1983" or "4/7/1984-25/12/1984".
  The earliest date you can select is 1/1/1900 and the latest is 31/12/2999.
  
  - Enter "help" to see the help text.
  - Enter "exit" to quit the application.
`;

/**
 * Instantiates the UserInterface & DateCalculator classes, then runs in a loop to take user input & respond accordingly
 * @param  {string} str       The string to parse
 * @param  {Number} min       The minimum number to accept
 * @param  {Number} max       The maximum number to accept
 * @return {Number | NaN}     The valid number or NaN
 */
const run = async () => {
  const userInterface = new UserInterface();
  const calculator = new DateCalculator();
  console.log("\nWelcome to the date distance app...");
  console.log(helpText);

  while(true) {
    const input = await userInterface.promptUser();
    
    switch (input) {
      case "exit":
        process.exit();
      case "help":
        console.log(helpText);
        break;
      default:
        try {
          const dates = input.split(" ");
          const days = calculator.getDaysBetween(dates);
          console.log(`There are ${days} day(s) between ${dates[0]} and ${dates[1]}`);
        } catch(e) {
          console.log("Error calculating distance:", e.message || e);
        }
        break;
    }
  }
};

run();
