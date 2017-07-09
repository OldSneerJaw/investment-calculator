new Vue({
  el: '#app',
  data: {
    currentTaxRate: null,
    retirementTaxRate: null,
    depositAmount: null,
    yearsInvested: null,
    roi: null,
    inflation: null,
    displayResults: false,
    naiveResult: 0,
    inflationResult: 0
  },
  methods: {
    calculate: function() {
      if (!this.validateInputs()) {
        this.displayResults = false;

        return;
      }

      let nominalInterest = this.calculateCompoundInterest(this.depositAmount, this.roi, this.yearsInvested);
      let realRateOfReturn = this.calculateRealRateOfReturn(this.roi, this.inflation);
      let realInterest = this.calculateCompoundInterest(this.depositAmount, realRateOfReturn, this.yearsInvested);

      this.naiveResult = (this.depositAmount + nominalInterest).toFixed(2);
      this.inflationResult = (this.depositAmount + realInterest).toFixed(2);

      this.displayResults = true;
    },
    calculateCompoundInterest: function(balance, rate, years) {
      return balance * (Math.pow(1 + (rate / 100), years) - 1);
    },
    calculateRealRateOfReturn: function(nominalRate, inflationRate) {
      return (((1 + (nominalRate / 100)) / (1 + (inflationRate / 100))) - 1) * 100;
    },
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
