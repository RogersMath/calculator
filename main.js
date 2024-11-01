// Initialize after UI script is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Make sure calculatorUI exists
  if (!window.calculatorUI) {
    console.error('Calculator UI not initialized');
    return;
  }

  // Calculator State Management
  const CalculatorState = {
    currentValue: '0',
    previousValue: null,
    operation: null,
    newNumberStarted: false,
    secondMode: false,
    memory: 0,
    variables: {},

    reset() {
      this.currentValue = '0';
      this.previousValue = null;
      this.operation = null;
      this.newNumberStarted = false;
    }
  };

  // Mathematical Operations
  const Operations = {
    basic: {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => b !== 0 ? a / b : null,
      power: (a, b) => Math.pow(a, b)
    },

    scientific: {
      square: x => Math.pow(x, 2),
      cube: x => Math.pow(x, 3),
      sqrt: x => Math.sqrt(x),
      cubeRoot: x => Math.cbrt(x),
      inverse: x => x !== 0 ? 1 / x : null,
      percent: x => x / 100
    }
  };

  // Event Handlers
  const Handlers = {
    number(value) {
      if (CalculatorState.newNumberStarted) {
        CalculatorState.currentValue = value;
        CalculatorState.newNumberStarted = false;
      } else if (CalculatorState.currentValue === '0' && value !== '.') {
        CalculatorState.currentValue = value;
      } else {
        CalculatorState.currentValue += value;
      }
      window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
    },

    decimal() {
      if (!CalculatorState.currentValue.includes('.')) {
        CalculatorState.currentValue += '.';
        window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
      }
    },

    divide() { this.operator('/'); },
    multiply() { this.operator('*'); },
    subtract() { this.operator('-'); },
    add() { this.operator('+'); },
    power() { this.operator('^'); },

    operator(op) {
      if (CalculatorState.previousValue !== null) {
        this.calculate();
      }
      CalculatorState.operation = op;
      CalculatorState.previousValue = parseFloat(CalculatorState.currentValue);
      CalculatorState.newNumberStarted = true;
      this.updateOperation();
    },

    square() {
      const func = CalculatorState.secondMode ? 'cube' : 'square';
      this.scientific(func);
    },

    sqrt() {
      const func = CalculatorState.secondMode ? 'cubeRoot' : 'sqrt';
      this.scientific(func);
    },

    inverse() {
      this.scientific('inverse');
    },

    percent() {
      this.scientific('percent');
    },

    scientific(func) {
      const value = parseFloat(CalculatorState.currentValue);
      const operation = Operations.scientific[func];
      if (operation) {
        const result = operation(value);
        if (result === null) {
          CalculatorState.currentValue = 'Error';
        } else {
          CalculatorState.currentValue = result.toString();
        }
        window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
      }
    },

    calculate() {
      if (CalculatorState.previousValue === null || CalculatorState.operation === null) return;

      const current = parseFloat(CalculatorState.currentValue);
      const prev = CalculatorState.previousValue;
      let result;

      switch (CalculatorState.operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current !== 0 ? prev / current : null; break;
        case '^': result = Math.pow(prev, current); break;
      }

      if (result === null) {
        CalculatorState.currentValue = 'Error';
      } else {
        CalculatorState.currentValue = parseFloat(result.toFixed(10))
          .toString()
          .replace(/\.?0+$/, '');
      }
      window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
    },

    equals() {
      this.calculate();
      CalculatorState.operation = null;
      CalculatorState.previousValue = null;
      this.updateOperation();
    },

    clear() {
      CalculatorState.reset();
      window.calculatorUI.Display.updateMain('0');
      this.updateOperation();
    },

    backspace() {
      if (CalculatorState.currentValue.length > 1) {
        CalculatorState.currentValue = CalculatorState.currentValue.slice(0, -1);
      } else {
        CalculatorState.currentValue = '0';
      }
      window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
    },

    toggleSecond() {
      CalculatorState.secondMode = !CalculatorState.secondMode;
      window.calculatorUI.Display.updateSecondMode(CalculatorState.secondMode);
    },

    updateOperation() {
      const { previousValue, operation, currentValue } = CalculatorState;
      if (previousValue !== null && operation !== null) {
        window.calculatorUI.Display.updatePrevious(`${previousValue} ${operation}`);
      } else {
        window.calculatorUI.Display.updatePrevious('');
      }
    },

    // Memory operations
    memoryRecall() {
      CalculatorState.currentValue = CalculatorState.memory.toString();
      window.calculatorUI.Display.updateMain(CalculatorState.currentValue);
    },

    memoryStore() {
      CalculatorState.memory = parseFloat(CalculatorState.currentValue);
      window.calculatorUI.Display.updateMemoryIndicator(CalculatorState.memory);
    },

    memoryAdd() {
      CalculatorState.memory += parseFloat(CalculatorState.currentValue);
      window.calculatorUI.Display.updateMemoryIndicator(CalculatorState.memory);
    }
  };

  // Initialize calculator
  window.calculatorUI.initializeCalculator(Handlers);
  window.calculatorUI.setupKeyboardSupport(Handlers);
});
