# Introduction

A solution to the WealthBar coding test by [Joel Andrews](https://github.com/OldSneerJaw). Built with HTML, JavaScript (ES6/ES2015) and [Vue.js](https://vuejs.org/).

See `WealthBar-Coding-Test.md` for the problem description.

# Instructions

The solution was intentionally designed to be dirt simple to run: simply launch `index.html` in a modern web browser (tested in Firefox and Chrome). No dependencies or external tools required.

To execute the test suite and lint the code, you will need to install a version of [Node.js](https://nodejs.org/en/download/) that supports ECMAScript 2015. Then execute the following steps:

1. Install dependencies: `npm install`
2. Run the tests: `npm test`
3. Lint the project with JSHint: `npm run jshint`

# Notes

- This is my first project using Vue.js. I aimed to keep the project intentionally as small and simple as possible. For example, the app uses a global Vue component rather than individual components and there is no build mechanism for preprocessing of files.
- The app is very plain looking. There is no sense in pretending that I am skilled at making web apps/sites look pretty. ;)
- The form leverages HTML 5's built in validation capabilities extensively (e.g. to check that values are numbers and that they are in range) to display helpful validation error messages in browsers that support it, but inputs are still validated in code before calculations are performed
- As the app uses a global Vue component and includes no build process, I had to get a little creative to write test cases for the code. The options provided to the global Vue component are exported via an npm module and wrapped in a constructor and then each method from the options is tested as a true unit. As I understand it, it is typical to test Vue components with integration-style tests (e.g. where the test cases are run in a browser like PhantomJS, Chrome, Firefox, etc. and data binding is validated directly by test cases), but that will have to be a lesson for another day.
- I had difficulty parsing the requirement "Amount of after-tax deposited in the TFSA vs RRSP (i.e., the RRSP deposit amount should be equivalent to the TFSA deposit in after-tax dollars, which should be larger considering that RRSP deposits are made tax-free)". In the end, I determined that it is effectively asking to display the amount that the user will receive from their tax refund from the investment in an RRSP. I also took the liberty of adding an output that shows what the future value would be if the RRSP tax refund were invested into the same fund.
- While not explicitly stated in the requirements, I included an output that displays the future value when adjusted for inflation (i.e. the future value after applying the real rate of return)
