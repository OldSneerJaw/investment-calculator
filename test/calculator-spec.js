const expect = require('chai').expect;
const calculatorModule = require('../src/calculator.js');

describe('Investment calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new CalculatorFake();
  });

  describe('input validation', () => {
    it('should allow non-zero values', () => {
      calculator.currentTaxRate = 0.1;
      calculator.retirementTaxRate = 0.1;
      calculator.depositAmount = 0.01;
      calculator.yearsInvested = 1;
      calculator.roi = 0.1;
      calculator.inflation = 0.1;

      let result = calculator.validateInputs();

      expect(result).to.equal(true);
    });

    it('should reject the default values', () => {
      let result = calculator.validateInputs();

      expect(result).to.equal(false);
    });

    it('should reject zero values', () => {
      calculator.currentTaxRate = 0;
      calculator.retirementTaxRate = 0;
      calculator.depositAmount = 0;
      calculator.yearsInvested = 0;
      calculator.roi = 0;
      calculator.inflation = 0;

      let result = calculator.validateInputs();

      expect(result).to.equal(false);
    });

    it('should reject a non-integer years value', () => {
      calculator.currentTaxRate = 0.1;
      calculator.retirementTaxRate = 0.1;
      calculator.depositAmount = 0.01;
      calculator.yearsInvested = 1.999;
      calculator.roi = 0.1;
      calculator.inflation = 0.1;

      let result = calculator.validateInputs();

      expect(result).to.equal(false);
    });

    it('should reject a current tax rate greater than 100%', () => {
      calculator.currentTaxRate = 100.00001;
      calculator.retirementTaxRate = 0.1;
      calculator.depositAmount = 0.01;
      calculator.yearsInvested = 1;
      calculator.roi = 0.1;
      calculator.inflation = 0.1;

      let result = calculator.validateInputs();

      expect(result).to.equal(false);
    });

    it('should reject a retirement tax rate greater than 100%', () => {
      calculator.currentTaxRate = 0.1;
      calculator.retirementTaxRate = 100.00001;
      calculator.depositAmount = 0.01;
      calculator.yearsInvested = 1;
      calculator.roi = 0.1;
      calculator.inflation = 0.1;

      let result = calculator.validateInputs();

      expect(result).to.equal(false);
    });
  });

  it('should calculate future value correctly', () => {
    let startingBalance = 1000;
    let interestRate = 1;
    let term = 12;

    let result = calculator.calculateFutureValue(startingBalance, interestRate, term);

    expect(result.toFixed(2)).to.equal('1126.83');
  });

  it('should calculate the real rate of return correctly', () => {
    let roi = 5;
    let inflationRate = 3;

    let result = calculator.calculateRealRateOfReturn(roi, inflationRate);

    expect(result.toFixed(3)).to.equal('1.942');
  });

  it('should calculate taxes correctly', () => {
    let amount = 7000;
    let taxRate = 35;

    let result = calculator.calculateTax(amount, taxRate);

    expect(result).to.equal(2450);
  });

  describe('full calculations', () => {
    it('should not show results when the inputs are invalid', () => {
      calculator.currentTaxRate = 0;
      calculator.retirementTaxRate = 0;
      calculator.depositAmount = 0;
      calculator.yearsInvested = 0;
      calculator.roi = 0;
      calculator.inflation = 0;

      calculator.calculate();

      expect(calculator.displayResults).to.equal(false);
      expect(calculator.nominalFutureValue).to.equal(0);
      expect(calculator.inflationFutureValue).to.equal(0);
      expect(calculator.rrspTaxRefund).to.equal(0);
      expect(calculator.rrspWithdrawalTaxValue).to.equal(0);
      expect(calculator.rrspFutureValueAfterTax).to.equal(0);
      expect(calculator.rrspWithTaxRefundFutureValueAfterTax).to.equal(0);
      expect(calculator.tfsaTaxRefund).to.equal(0);
      expect(calculator.tfsaWithdrawalTaxValue).to.equal(0);
      expect(calculator.tfsaFutureValueAfterTax).to.equal(0);
      expect(calculator.tfsaWithTaxRefundFutureValueAfterTax).to.equal(0);
    });

    it('produce the correct results when the inputs are valid', () => {
      calculator.currentTaxRate = 30;
      calculator.retirementTaxRate = 20;
      calculator.depositAmount = 1500;
      calculator.yearsInvested = 12;
      calculator.roi = 5;
      calculator.inflation = 3;

      calculator.calculate();

      expect(calculator.displayResults).to.equal(true);
      expect(calculator.nominalFutureValue.toFixed(2)).to.equal('2693.78');
      expect(calculator.inflationFutureValue.toFixed(2)).to.equal('1889.37');
      expect(calculator.rrspTaxRefund).to.equal(450);
      expect(calculator.rrspWithdrawalTaxValue.toFixed(2)).to.equal('538.76');
      expect(calculator.rrspFutureValueAfterTax.toFixed(2)).to.equal('2155.03');
      expect(calculator.rrspWithTaxRefundFutureValueAfterTax.toFixed(2)).to.equal('2801.54');
      expect(calculator.tfsaTaxRefund).to.equal(0);
      expect(calculator.tfsaWithdrawalTaxValue).to.equal(0);
      expect(calculator.tfsaFutureValueAfterTax).to.equal(calculator.nominalFutureValue);
      expect(calculator.tfsaWithTaxRefundFutureValueAfterTax).to.equal(calculator.nominalFutureValue);
    });
  });

  function CalculatorFake() {
    // Copy all data properties from the Vue options
    for (let dataPropertyName in calculatorModule.options.data) {
      this[dataPropertyName] = calculatorModule.options.data[dataPropertyName];
    }

    // Copy all methods from the Vue options
    for (let methodName in calculatorModule.options.methods) {
      this[methodName] = calculatorModule.options.methods[methodName];
    }
  }
});
