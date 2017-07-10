let options = {
  el: '#calculator',
  data: {
    currentTaxRate: null,
    retirementTaxRate: null,
    depositAmount: null,
    yearsInvested: null,
    roi: null,
    inflation: null,
    displayResults: false,
    nominalFutureValue: 0,
    inflationFutureValue: 0,
    rrspTaxRefund: 0,
    rrspWithdrawalTaxValue: 0,
    rrspFutureValueAfterTax: 0,
    rrspWithTaxRefundFutureValueAfterTax: 0,
    tfsaTaxRefund: 0,
    tfsaWithdrawalTaxValue: 0,
    tfsaFutureValueAfterTax: 0,
    tfsaWithTaxRefundFutureValueAfterTax: 0
  },
  methods: {
    /**
     * Performs all RRSP and TFSA investment calculations.
     */
    calculate: function() {
      if (!this.validateInputs()) {
        this.displayResults = false;

        return;
      }

      // The future value is calculated in today's dollars (i.e. not adjusted for inflation)
      this.nominalFutureValue = this.calculateFutureValue(this.depositAmount, this.roi, this.yearsInvested);

      // The real rate of rate/interest is calculated by adjusting for inflation
      let realRateOfReturn = this.calculateRealRateOfReturn(this.roi, this.inflation);
      this.inflationFutureValue = this.calculateFutureValue(this.depositAmount, realRateOfReturn, this.yearsInvested);

      // Calculate RRSP values with taxes taken into account:
      // - the investor will receive a tax refund for the current year for the value of the amount deposited at the current tax rate
      // - the investor must pay tax on funds that are withdrawn in the future (using the expected average retirement tax rate)
      // - the tax refund may also be invested to further boost the performance of the investment
      this.rrspTaxRefund = this.calculateTax(this.depositAmount, this.currentTaxRate);
      this.rrspWithdrawalTaxValue = this.calculateTax(this.nominalFutureValue, this.retirementTaxRate);
      this.rrspFutureValueAfterTax = this.nominalFutureValue - this.rrspWithdrawalTaxValue;
      this.rrspWithTaxRefundFutureValueAfterTax = this.calculateRrspWithTaxRefundFutureValueAfterTax();

      // Calculate TFSA values with taxes taken into account:
      // - the investor has already paid taxes on the deposit amount so there is no tax refund
      // - the investor does NOT pay taxes on funds that are withdrawn in the future so WYSIWYG for the future value
      // - since there is no tax refund, there is nothing extra to invest come tax return time
      this.tfsaTaxRefund = 0;
      this.tfsaWithdrawalTaxValue = 0;
      this.tfsaFutureValueAfterTax = this.nominalFutureValue;
      this.tfsaWithTaxRefundFutureValueAfterTax = this.nominalFutureValue;

      this.displayResults = true;
    },

    /**
     * Calculates the future value based on the specified starting balance, interest rate and the term of the investment:
     * http://www.financeformulas.net/Compound_Interest.html
     *
     * @param {Number} startingBalance The starting balance
     * @param {Number} interestRate The average interest rate per period as a percentage (i.e. between 0 and 100)
     * @param {Number} numPeriods The number of periods (e.g. months, years) of the investment
     *
     * @returns {Number} The amount of interest in dollars
     */
    calculateFutureValue: function(startingBalance, interestRate, numPeriods) {
      return startingBalance * Math.pow(1 + (interestRate / 100), numPeriods);
    },

    /**
     * Calculates the real rate of return of an investment: http://www.financeformulas.net/Real_Rate_of_Return.html
     *
     * @param {Number} roi The return on investment per year as a percentage (i.e. between 0 and 100)
     * @param {Number} inflationRate The average rate of inflation per year as a percentage (i.e. between 0 and 100)
     *
     * @returns {Number} The real rate of return as a percentage (i.e. between 0 and 100)
     */
    calculateRealRateOfReturn: function(roi, inflationRate) {
      return (((1 + (roi / 100)) / (1 + (inflationRate / 100))) - 1) * 100;
    },

    /**
     * Calculates tax.
     *
     * @param {Number} amount The amount to which to apply the tax rate
     * @param {Number} taxRate The tax rate as a percentage (i.e. between 0 and 100)
     *
     * @returns {Number} The amount of tax in dollars
     */
    calculateTax: function(amount, taxRate) {
      return amount * (taxRate / 100);
    },

    /**
     * Calculates the approximate future value of the RRSP assuming the tax refund is also invested into the same fund.
     *
     * @returns {Number} The future value if the tax refund is also invested
     */
    calculateRrspWithTaxRefundFutureValueAfterTax: function() {
      let rrspWithTaxRefundDepositAmount = this.depositAmount + this.rrspTaxRefund;
      let rrspWithTaxRefundFutureValue = this.calculateFutureValue(rrspWithTaxRefundDepositAmount, this.roi, this.yearsInvested);
      let rrspWithTaxRefundWithdrawalTaxValue = this.calculateTax(rrspWithTaxRefundFutureValue, this.retirementTaxRate);

      return rrspWithTaxRefundFutureValue - rrspWithTaxRefundWithdrawalTaxValue;
    },

    /**
     * Determine whether the user input field values are valid.
     *
     * @returns {Boolean} Whether the inputs are valid
     */
    validateInputs: function() {
      return this.currentTaxRate >= 0.1 &&
        this.retirementTaxRate >= 0.1 &&
        this.depositAmount >= 0.01 &&
        this.yearsInvested >= 1 && Number.isInteger(this.yearsInvested) &&
        this.roi >= 0.1 &&
        this.inflation >= 0.1;
    }
  }
};

if (typeof(Vue) === 'function') {
  // Instantiate the global Vue component
  new Vue(options);
} else if (typeof(exports) !== 'undefined') {
  // Export the options as an npm module so they can be exercised independently in unit tests
  exports.options = options;
}
