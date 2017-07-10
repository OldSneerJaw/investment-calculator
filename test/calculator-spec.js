const expect = require('expect.js');
const calculatorModule = require('../src/calculator.js');

describe('Investment calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
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

      expect(result).to.be(true);
    });

    it('should reject the default values', () => {
      let result = calculator.validateInputs();

      expect(result).to.be(false);
    });

    it('should reject zero values', () => {
      calculator.currentTaxRate = 0;
      calculator.retirementTaxRate = 0;
      calculator.depositAmount = 0;
      calculator.yearsInvested = 0;
      calculator.roi = 0;
      calculator.inflation = 0;

      let result = calculator.validateInputs();

      expect(result).to.be(false);
    });

    it('should reject a non-integer years value', () => {
      calculator.currentTaxRate = 0.1;
      calculator.retirementTaxRate = 0.1;
      calculator.depositAmount = 0.01;
      calculator.yearsInvested = 1.999;
      calculator.roi = 0.1;
      calculator.inflation = 0.1;

      let result = calculator.validateInputs();

      expect(result).to.be(false);
    });
  });

  function Calculator() {
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
