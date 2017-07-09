# WealthBar Coding Test
Implement a solution to the financial problem below using languages or tools of your choice. We suggest just building a browser interface with HTML, CSS and Javascript, but a CLI tool or something else is fine too. It should be easy for us to run on our own machines without connecting to a running web server. You should submit it as a zip or tarball. You are free to use any tools or frameworks that you like (e.g, Angular, React, Bootstrap) as long as it is still easy for us to bootstrap and run ourselves.

Unit tests are appreciated and recommended but not required. They may help in documenting and explaining your thinking and thought process in the implementation. They should be easy for us to run and you should provide a README that explains how to run the project and the unit tests.
The Problem: TFSAs vs RRSPs

The goal of this test is to create a financial calculator that compares using a TFSA (tax-free savings account) and RRSP (registered retirement savings plan) to save money.

RRSPs allow Canadians to defer paying taxes until they withdraw money from their account. In practice Canadians get a tax refund on the money they deposited into RSP. A TFSA, on the other hand, allows Canadians to save their after tax money in a way that the future growth (interest earned) remains tax-free forever so all future withdrawals are not taxed.

**This calculator will require the following input fields**

- **Current Marginal Tax Rate** - This is the highest income tax bracket of the “user”
- **Average Tax Rate in Retirement** - This is the average income tax the “user” pays in retirement
- **Amount of Deposit** - The amount of money being deposited in the comparison
- **Years Invested** - The number of years before this money is withdrawn again
- **Return on Investment** - Rate at which the invested money grows each year
- **Inflation Rate** - Expected rate of inflation each year (used to calculate the real rate of return)

**It should produce the following results**

- Amount of after-tax deposited in the TFSA vs RRSP (i.e., the RRSP deposit amount should be equivalent to the TFSA deposit in after-tax dollars, which should be larger considering that RRSP deposits are made tax-free)
- The future value (in [today](http://airmail.calendar/2016-07-29%2012:00:00%20PDT)’s dollars) of the savings at the end of the investment period
- The tax paid upon withdrawal (only applies to money saved in theRRSP)
- The after-tax future value of the investment at the end of the investment period

**Useful Formulas and Resources**
The following resources help explain the necessary financial formulas and the basics of comparing TFSAs and RRSPs


- [http://www.financeformulas.net/Real_Rate_of_Return.html](http://www.financeformulas.net/Real_Rate_of_Return.html)
- [http://financeformulas.net/Future_Value.html](http://financeformulas.net/Future_Value.html)
- [http://www.theglobeandmail.com/globe-investor/personal-finance/the-wealthy-barber-explains-tfsa-or-rrsp/article1356709/?page=all](http://www.theglobeandmail.com/globe-investor/personal-finance/the-wealthy-barber-explains-tfsa-or-rrsp/article1356709/?page=all)
- [http://www.cra-arc.gc.ca/tfsa/](http://www.cra-arc.gc.ca/tfsa/)

**What are we looking for?**
We are interested in how you solve the problem as well as your ability to understand and apply the financial concepts necessary to solve it. We will also be looking, subjectively, at coding style, code quality, code readability and effective use of the language's idioms and software design patterns. If you are using any frameworks we will be consider how you leverage them to write better code or simplify the problem.

While not necessary credit will be given for providing a solid user experience. Communicating what the calculator does for the user and ensuring they can easily figure out how to use it and understand what the results presented mean is important.

**Feel free to ask questions if anything is uncertain or confusing.**

