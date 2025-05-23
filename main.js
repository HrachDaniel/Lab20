const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentInput = '';
let fullExpression = ''; 
let operator = null;
let previousValue = null;

function updateDisplay() {

    display.textContent = fullExpression || currentInput || '0';
}

function handleNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    fullExpression += number; 
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;

    if (previousValue !== null) {
        calculate(false); 
    } else {
        fullExpression = currentInput; 
    }

    operator = op;
    previousValue = parseFloat(currentInput);
    
    let operatorSymbol;
    switch(op) {
        case 'add': operatorSymbol = '+'; break;
        case 'subtract': operatorSymbol = '-'; break;
        case 'multiply': operatorSymbol = '×'; break;
        case 'divide': operatorSymbol = '÷'; break;
        case 'percent': operatorSymbol = '%'; break;
        default: operatorSymbol = op;
    }
    
    fullExpression += ' ' + operatorSymbol + ' '; // Додаємо оператор до виразу
    currentInput = '';
    updateDisplay();
}

function handleClear() {
    currentInput = '';
    fullExpression = '';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function handlePercent() {
    if (currentInput !== '') {
        currentInput = String(parseFloat(currentInput) / 100);
        fullExpression = currentInput; // Оновлюємо вираз
        updateDisplay();
    }
}

function calculate(updateExpression = true) {
    if (operator === null || previousValue === null) return;

    let result;
    const currentValue = parseFloat(currentInput);

    switch (operator) {
        case 'add':
            result = previousValue + currentValue;
            break;
        case 'subtract':
            result = previousValue - currentValue;
            break;
        case 'multiply':
            result = previousValue * currentValue;
            break;
        case 'divide':
            result = currentValue === 0 ? 'Помилка!' : previousValue / currentValue;
            break;
        case 'percent':
            result = previousValue / 100 * currentValue;
            break;
        default:
            return;
    }

    currentInput = String(result);
    if (updateExpression) {
        fullExpression = currentInput; 
    }
    operator = null;
    previousValue = null;
    updateDisplay();
}

buttons.addEventListener('click', event => {
    const target = event.target;

    if (target.dataset.number) {
        handleNumber(target.dataset.number);
    }

    if (target.dataset.action === 'add' || 
        target.dataset.action === 'subtract' || 
        target.dataset.action === 'multiply' || 
        target.dataset.action === 'divide' || 
        target.dataset.action === 'percent') {
        handleOperator(target.dataset.action);
    }

    if (target.dataset.action === 'clear') {
        handleClear();
    }

    if (target.dataset.action === 'calculate') {
        calculate();
    }
});
