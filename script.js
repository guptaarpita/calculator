const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.number) {
      currentInput += button.dataset.number;
      updateDisplay(currentInput);
    } else if (button.dataset.operator) {
      if (currentInput) {
        operator = button.dataset.operator;
        previousInput = currentInput;
        currentInput = '';
      }
    } else if (button.id === 'clear') {
      clearCalculator();
    } else if (button.id === 'delete') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (button.id === 'equals') {
      if (previousInput && currentInput && operator) {
        currentInput = calculate(previousInput, currentInput, operator);
        operator = null;
        previousInput = '';
        updateDisplay(currentInput);
      }
    }
  });
});

function updateDisplay(value) {
  display.value = value || '0';
}

function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

function calculate(num1, num2, operator) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b !== 0 ? (a / b).toString() : 'Error';
    default:
      return '';
  }
}
