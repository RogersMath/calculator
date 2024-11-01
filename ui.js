// UI Configuration and Button Setup
const buttonConfig = [
  // Row 1
  { text: '2nd', class: 'second', handler: 'toggleSecond' },
  { text: 'MR', class: 'memory', handler: 'memoryRecall' },
  { text: 'MS', class: 'memory', handler: 'memoryStore' },
  { text: 'M+', class: 'memory', handler: 'memoryAdd' },
  { text: 'C', class: 'clear', handler: 'clear' },

  // Row 2
  { text: 'x²', secondaryText: 'x³', class: 'function', handler: 'square' },
  { text: '√x', secondaryText: '∛x', class: 'function', handler: 'sqrt' },
  { text: '1/x', class: 'function', handler: 'inverse' },
  { text: '%', class: 'function', handler: 'percent' },
  { text: '/', class: 'operator', handler: 'divide' },

  // Row 3
  { text: '7', handler: 'number' },
  { text: '8', handler: 'number' },
  { text: '9', handler: 'number' },
  { text: '(', class: 'function', handler: 'parenthesis' },
  { text: '×', class: 'operator', handler: 'multiply' },

  // Row 4
  { text: '4', handler: 'number' },
  { text: '5', handler: 'number' },
  { text: '6', handler: 'number' },
  { text: ')', class: 'function', handler: 'parenthesis' },
  { text: '−', class: 'operator', handler: 'subtract' },

  // Row 5
  { text: '1', handler: 'number' },
  { text: '2', handler: 'number' },
  { text: '3', handler: 'number' },
  { text: '⌫', handler: 'backspace' },
  { text: '+', class: 'operator', handler: 'add' },

  // Row 6
  { text: '0', handler: 'number' },
  { text: '.', handler: 'decimal' },
  { text: 'xʸ', class: 'function', handler: 'power' },
  { text: '=', class: 'equals', handler: 'equals' }
];

// Display management
const Display = {
  updateMain(value) {
    document.getElementById('display').textContent = value;
  },

  updatePrevious(expression, showEquals) {
    document.getElementById('previous-operation').textContent = expression;
  },

  updateMemoryIndicator(value) {
    document.getElementById('memory-indicator').textContent = `MEM: ${value}`;
  },

  updateSecondMode(isActive) {
    document.getElementById('second-indicator').textContent = `2ND: ${isActive ? 'ON' : 'OFF'}`;
    document.querySelector('.second').classList.toggle('active', isActive);
  }
};

// UI initialization
function initializeCalculator(handlers) {
  const buttonsContainer = document.getElementById('calculator-buttons');
  
  buttonConfig.forEach(config => {
    const button = document.createElement('button');
    if (config.class) button.className = config.class;
    
    if (config.secondaryText) {
      button.innerHTML = `
        <span class="secondary-function">${config.secondaryText}</span>
        <span>${config.text}</span>
      `;
    } else {
      button.textContent = config.text;
    }
    
    button.addEventListener('click', () => {
      const handler = handlers[config.handler];
      if (handler) {
        handler(config.text);
      }
    });
    
    buttonsContainer.appendChild(button);
  });
}

// Keyboard handler setup
function setupKeyboardSupport(handlers) {
  document.addEventListener('keydown', (e) => {
    const keyHandlers = {
      'Enter': 'equals',
      'Escape': 'clear',
      'Backspace': 'backspace',
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      '(': 'parenthesis',
      ')': 'parenthesis'
    };

    if (/^[0-9]$/.test(e.key)) {
      handlers.number(e.key);
    } else if (e.key === '.') {
      handlers.decimal();
    } else if (keyHandlers[e.key]) {
      handlers[keyHandlers[e.key]](e.key);
    }
  });
}

export { Display, initializeCalculator, setupKeyboardSupport };
