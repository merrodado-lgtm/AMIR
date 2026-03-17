let display = document.getElementById('display');
let displayHistory = document.getElementById('displayHistory');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

updateDisplay();

function appendToDisplay(value) {
    if (['+', '-', '×', '÷', '%'].includes(value)) {
        if (currentValue === '' || currentValue === '0') return;
        
        if (previousValue !== '' && operation !== null) {
            calculate();
        }
        
        previousValue = currentValue;
        operation = value;
        currentValue = '';
        updateDisplay();
        return;
    }

    if (value === '√') {
        const num = parseFloat(currentValue);
        if (isNaN(num) || num < 0) return;
        currentValue = Math.sqrt(num).toString();
        shouldResetDisplay = true;
        updateDisplay();
        return;
    }

    if (value === '^') {
        if (currentValue === '' || currentValue === '0') return;
        previousValue = currentValue;
        operation = '^';
        currentValue = '';
        updateDisplay();
        return;
    }

    if (value === '(' || value === ')') {
        if (currentValue === '0') {
            currentValue = value;
        } else {
            currentValue += value;
        }
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    if (value === '.') {
        if (shouldResetDisplay) {
            currentValue = '0.';
            shouldResetDisplay = false;
        } else if (!currentValue.includes('.')) {
            if (currentValue === '') {
                currentValue = '0.';
            } else {
                currentValue += '.';
            }
        }
        updateDisplay();
        return;
    }

    if (shouldResetDisplay) {
        currentValue = value;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && value !== '0') {
            currentValue = value;
        } else if (currentValue === '0' && value === '0') {
            
        } else {
            currentValue += value;
        }
    }

    updateDisplay();
}

function calculate() {
    if (previousValue === '' || operation === null || currentValue === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                currentValue = 'لا يمكن القسمة على صفر';
                previousValue = '';
                operation = null;
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }

    result = Math.round(result * 1000000000) / 1000000000;
    
    currentValue = result.toString();
    previousValue = '';
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue === '0' || currentValue === '') {
        return;
    }

    if (currentValue.length === 1) {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    shouldResetDisplay = false;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentValue || '0';

    if (previousValue && operation) {
        const operatorDisplay = {
            '+': '+',
            '-': '-',
            '×': '×',
            '÷': '÷',
            '%': '%',
            '^': 'x^'
        };
        displayHistory.textContent = previousValue + ' ' + operatorDisplay[operation];
    } else {
        displayHistory.textContent = '';
    }
}
function calculate18~21() {
    const num = parseFloat(currentValue);
    
    if (isNaN(num)) {
        alert('من فضلك ادخل رقم أولاً');
        return;
    }
    
    const result = (num * 850) / 1000;
    
    // Round to avoid floating point errors
    const finalResult = Math.round(result * 1000000000) / 1000000000;
    
    currentValue = finalResult.toString();
    previousValue = '';
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        event.preventDefault();
        appendToDisplay('+');
    } else if (key === '-') {
        event.preventDefault();
        appendToDisplay('-');
    } else if (key === '*') {
        event.preventDefault();
        appendToDisplay('×');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('÷');
    } else if (key === '%') {
        event.preventDefault();
        appendToDisplay('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clearDisplay();
    } else if (key === '(' || key === ')') {
        event.preventDefault();
        appendToDisplay(key);
    }
});
