# Dates Distance App
A node CLI application to calculate the distance between two dates

## About
This application is written in node js an uses no external libraries (only jest is used for testing). It accepts user input from `stdin` and will prompt the user to enter two dates (which must be in dd/mm/yyyy format). 

These dates can be seperated by any combination of space, "-", "to" or "and". For example "01/01/2001 03/01/2001", "2/6/1983 to 22/6/1983" or "4/7/1984-25/12/1984".

The earliest allowed date is 1/1/1900 and the latest is 31/12/2999. Dates outside of these bounds will be rejected.
  
### Other possible commands:
  - "help" - to see the help text.
  - "exit" - to quit the application.

## To run
Navigate to the root directory of the project and run directly using `node index.js` or through NPM / Yarn using `npm run start` or `yarn start`.

When the application is running, users can enter two dates to calculate the distance in days between them. For example:
- 01/01/2001 03/01/2001 `returns 1`
- 2/6/1983 to 22/6/1983 `returns 19`
- 4/7/1984 and 25/12/1984 `returns 173`
- 3/1/1989 - 3/8/1983 `returns 1979`

## To test
Testing is done with `jest` so install the dependency using the command `npm install` or `yarn install`, then entering `npm run test` or `yarn test`.