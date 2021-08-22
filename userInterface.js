const readline = require("readline");

class UserInterface {
  constructor() {
    /**
     * The class used to accept and standardize user input
     * To use, create a new instance.
     */
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }
  /**
   * Prompts the user with a given string, and returns a Promise which resolves when the user enters some text
   * @param  {string} question  The prompt with which to present the user
   * @return {Promise}          A Promise which resolves when the user enters some text
   */
  async askUser(question) {
    return new Promise(resolve => this.rl.question(`${question}\n`, resolve));
  }
  /**
   * Standardizes the given string to a format which is acceptable to the application ("textstring textstring")
   * @param  {string} str  The string to standardize
   * @return {string}      The standardized string
   */
  standardizeUserInput(str) {  
    // Replace all instances of space,-,to,and with a single space character
    // Trim whitespace and convert to lower case
    return str.replace(/(\s|-|to|and)+/g, " ").trim().toLowerCase();
  }
  /**
   * Prompts the user to enter their two dates, waits for the user's input, then standardizes and returns the input
   * @return {string} The user's standardized input
   */
  async promptUser() {
    const input = (await this.askUser("\nPlease enter 2 dates..."));
    return this.standardizeUserInput(input);
  }
}

module.exports = {
  UserInterface
}