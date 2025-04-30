
const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentInput = '';
let operator = null;
let previousValue = null;

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function handleNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;

    if (previousValue !== null) {
        calculate();
    }

    operator = op;
    previousValue = parseFloat(currentInput);
    currentInput = '';
}

function handleClear() {
    currentInput = '';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function handlePercent() {
    if (currentInput !== '') {
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay();
    }
}

function calculate() {
    if (operator === null || previousValue === null) return;

    let result;
    const currentValue = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                result = 'Помилка!';
                break;
            }
            result = previousValue / currentValue;
            break;
        case '%': // Обробка відсотка як операції (наприклад, 10% від 50)
            result = previousValue / 100 * currentValue;
            break;
        default:
            return;
    }

    currentInput = String(result);
    operator = null;
    previousValue = null;
    updateDisplay();
}

buttons.addEventListener('click', event => {
    const target = event.target;

    if (target.dataset.number) {
        handleNumber(target.dataset.number);
    }

    if (target.dataset.action === 'add') ;  (target.dataset.action === 'subtract') ; (target.dataset.action === 'multiply') ; (target.dataset.action === 'divide') ; (target.dataset.action === 'percent') 
        { handleOperator(target.dataset.action === 'multiply' ? '×' : target.dataset.action);
    }

    if (target.dataset.action === 'clear') {
        handleClear();
    }

    if (target.dataset.action === 'calculate') {
        calculate();
    }
});
