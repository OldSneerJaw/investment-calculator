new Vue({
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

      // The nominal interest is calculated in today's dollars (i.e. not adjusted for inflation):
      // http://www.financeformulas.net/Compound_Interest.html
      let nominalInterest = this.calculateCompoundInterest(this.depositAmount, this.roi, this.yearsInvested);
      this.nominalFutureValue = this.depositAmount + nominalInterest;

      // The real rate of rate/interest is calculated by adjusting for inflation
      let realRateOfReturn = this.calculateRealRateOfReturn(this.roi, this.inflation);
      let realInterest = this.calculateCompoundInterest(this.depositAmount, realRateOfReturn, this.yearsInvested);
      this.inflationFutureValue = this.depositAmount + realInterest;

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
     * Calculates compound interest on a starting balance over a given number of years.
     *
     * @param {Number} startingBalance The starting balance
     * @param {Number} interestRate The average interest rate as a percentage (i.e. between 0 and 100)
     * @param {Number} years The number of years of the investment
     *
     * @returns {Number} The amount of interest in dollars
     */
    calculateCompoundInterest: function(startingBalance, interestRate, years) {
      return startingBalance * (Math.pow(1 + (interestRate / 100), years) - 1);
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
      let rrspWithTaxRefundNominalInterest = this.calculateCompoundInterest(rrspWithTaxRefundDepositAmount, this.roi, this.yearsInvested);
      let rrspWithTaxRefundFutureValue = rrspWithTaxRefundDepositAmount + rrspWithTaxRefundNominalInterest;
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
        this.yearsInvested >= 1 && Number.isInteger(this.yearsInvested)
        this.roi >= 0.1 &&
        this.inflation >= 0.1;
    }
  }
});
