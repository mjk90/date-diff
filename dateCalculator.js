class DateCalculator {
  constructor() {
    /**
     * The class used to perform calculations such as getDaysBetween and dateToDays on the given input
     * To use, create a new instance.
     */
    this.MIN_YEAR = 1900;
    this.MAX_YEAR = 2999;
  }
  /**
   * Attempts to parse the given string and return a valid number (or NaN if string is invalid or outside the given min & max)
   * @param  {string} str       The string to parse
   * @param  {Number} min       The minimum number to accept
   * @param  {Number} max       The maximum number to accept
   * @return {Number | NaN}     The valid number or NaN
   */
   tryParseDateSegment(str, min, max) {
    // Make sure str is divisible by 1 with no remainder, otherwise, it's not an integer
    if(str % 1 === 0) {
      const num = parseInt(str);
      if(num >= min && num <= max) {
        return num;
      }
    }
    return NaN;
  }
  /**
   * Calculates how many days there are in a given month
   * @param  {Number} month     The number of the month 1 (january) - 12 (december)
   * @param  {boolean} leapYear Whether the year of this month is a leap year
   * @return {Number}           The amount of days in the given month
   */
  getDaysInMonth = (month, leapYear) => ({ 1: 31, 2: leapYear ? 29 : 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }[month])
  /**
   * Calculates whether the given year is a leap year
   * @param  {Number} year The year to check
   * @return {boolean}     Whether the given year is a leap year
   */
  isLeapYear = year => ( (year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0)
  /**
   * Attempts to parse the given string and return a valid year number (or NaN if string is invalid or outside the bounds of MIN_YEAR to MAX_YEAR)
   * @param  {string} yearString  The string to parse
   * @return {Number | NaN}       The valid year number or NaN
   */
  getValidYear = yearString => this.tryParseDateSegment(yearString, this.MIN_YEAR, this.MAX_YEAR)
  /**
   * Attempts to parse the given string and return a valid month number (or NaN if string is invalid or outside the bounds of 1 to 12)
   * @param  {string} monthString The string to parse
   * @return {Number | NaN}       The valid month number or NaN
   */
  getValidMonth = monthString => this.tryParseDateSegment(monthString, 1, 12)
  /**
   * Attempts to parse the given string and return a valid day number (or NaN if string is invalid or outside the bounds of 1 to {max days in month})
   * @param  {string} dayString The string to parse
   * @param  {Number} month     The month which this day is in
   * @return {Number | NaN}     The valid day number or NaN
   */
  getValidDay(dayString, month, year) {
    const daysInMonth = this.getDaysInMonth(month, this.isLeapYear(year));
    return this.tryParseDateSegment(dayString, 1, daysInMonth);
  }
  /**
   * Attempts to convert the given string to a date object of { day: Number, month: Number, year: Number }
   * Requires a date string in dd/mm/yyyy format, otherwise it will return false
   * @param  {string} str         The string to parse
   * @return {object | boolean}   The valid date object, or false
   */
  strToDate(str) {
    const parts = str.split("/");
    // Reject if the amount of date segments is wrong
    if(parts.length !== 3) {
      return false;
    }
  
    let year = this.getValidYear(parts[2]);
    let month = this.getValidMonth(parts[1])
    let day = this.getValidDay(parts[0], month, year);
  
    // Reject if any of the segments failed to parse
    if(isNaN(year) || isNaN(month) || isNaN(day)) {
      return false;
    }
  
    return { day, month, year };
  }
  /**
   * Attempts to convert the given date object of { day: Number, month: Number, year: Number } to a number of days since MIN_DATE
   * @param  {object} date    The date object to convert
   * @return {Number}         The amount of days since MIN_DATE
   */
  dateToDays(date) {
    const { day, month, year } = date;
    // Reject if any of the date's properties are invalid or non-existant
    if(typeof day !== 'number' || typeof month  !== 'number' || typeof year !== 'number') {
      return false;
    }
  
    // Check if the given year is a leap year, this will be used to count the days of each month
    const dateIsLeapYear = this.isLeapYear(year);
    let days = 0;
  
    // Add years
    for(let i = this.MIN_YEAR; i < year; i++) {
      days += this.isLeapYear(i) ? 366 : 365;
    }
    // Add months
    for(let i = 1; i < month; i++) {
      days += this.getDaysInMonth(i, dateIsLeapYear);
    }
    // Add days
    return days + day;
  }
  /**
   * Takes an array of two date strings, converts them each to a number of days, and subtracts 
   * the lower number from the higher, to give the difference in days between the two dates
   * @param  {string[]} dates   The array of date strings (must be two or an error will be thrown)
   * @return {Number}           The amount of days between the given dates
   */
  getDaysBetween(dates) {
    // Reject if more or less than 2 strings are given
    if(!Array.isArray(dates) || dates.length !== 2) {
      throw Error(`Found ${dates.length} date(s)`);
    }
    
    const from = this.strToDate(dates[0]);
    const to = this.strToDate(dates[1]);
  
    // Reject if either of the strings cannot be parsed
    if(!from || !to) {
      throw Error(`Could not parse date(s):${!from ? ` ${dates[0]}` : ""}${!to ? ` ${dates[1]}` : ""}`);
    }
  
    const fromDays = this.dateToDays(from);
    const toDays = this.dateToDays(to);

    // Reject if either of the dates cannot be converted to a number of days
    if(!fromDays || !toDays) {
      throw Error(`Could not convert dates to days:${!fromDays ? ` ${dates[0]}` : ""}${!toDays ? ` ${dates[1]}` : ""}`);
    }
  
    // Calculate which number is higher, then subtract the lower number from the higher to get the result.
    // Add 1 to the lower number so that the count includes only the days between the two dates
    const diff = fromDays < toDays ? 
      toDays - (fromDays + 1) : 
      fromDays - (toDays + 1);
  
    return diff;
  };
}

module.exports = {
  DateCalculator
}