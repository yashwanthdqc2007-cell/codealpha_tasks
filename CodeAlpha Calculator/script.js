/* =============================
   SMART CALCULATOR — script.js
   ============================= */

// ── DOM References ──────────────────────────────────────────────────────────
const resultDisplay     = document.getElementById('result-display');
const expressionDisplay = document.getElementById('expression-display');
const historyList       = document.getElementById('history-list');
const historyPanel      = document.getElementById('history-panel');
const toggleHistoryBtn  = document.getElementById('toggle-history-btn');
const clearHistoryBtn   = document.getElementById('clear-history-btn');
const copyBtn           = document.getElementById('copy-btn');

// ── State ────────────────────────────────────────────────────────────────────
let currentOperand   = '';
let previousOperand  = '';
let operation        = null;
let shouldResetScreen = false;

let calcHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

// ── Display ──────────────────────────────────────────────────────────────────
function updateDisplay() {
    resultDisplay.textContent = currentOperand === '' ? '0' : currentOperand;

    if (operation !== null) {
        let opSymbol = operation;
        if (opSymbol === '*') opSymbol = '×';
        if (opSymbol === '/') opSymbol = '÷';
        if (opSymbol === '-') opSymbol = '−';
        expressionDisplay.textContent = `${previousOperand} ${opSymbol}`;
    } else {
        expressionDisplay.textContent = '';
    }
}

// ── Core Calculator Logic ────────────────────────────────────────────────────
function appendNumber(number) {
    if (currentOperand === 'Error') clear();
    if (number === '.' && currentOperand.includes('.')) return;

    if (shouldResetScreen) {
        currentOperand   = '';
        shouldResetScreen = false;
    }

    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }

    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === 'Error') clear();
    if (currentOperand === '') return;

    if (previousOperand !== '') {
        calculate();
    }

    operation        = op;
    previousOperand  = currentOperand;
    currentOperand   = '';
    updateDisplay();
}

function calculate() {
    const prev    = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    // Format symbol for history display
    let opSymbol = operation;
    if (opSymbol === '*') opSymbol = '×';
    if (opSymbol === '/') opSymbol = '÷';
    if (opSymbol === '-') opSymbol = '−';
    const fullExpression = `${previousOperand} ${opSymbol} ${currentOperand}`;

    let computation;
    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/':
            if (current === 0) {
                currentOperand   = 'Error';
                operation        = null;
                previousOperand  = '';
                shouldResetScreen = true;
                updateDisplay();
                return;
            }
            computation = prev / current;
            break;
        case '%': computation = prev % current; break;
        default: return;
    }

    // Round to avoid floating-point noise
    let formattedResult = Math.round(computation * 1e8) / 1e8;
    formattedResult     = formattedResult.toString();

    saveHistory(fullExpression, formattedResult);

    currentOperand   = formattedResult;
    operation        = null;
    previousOperand  = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clear() {
    currentOperand  = '';
    previousOperand = '';
    operation       = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === 'Error') {
        clear();
        return;
    }
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

// ── History ──────────────────────────────────────────────────────────────────
function saveHistory(expression, result) {
    // Skip duplicate consecutive entries
    if (
        calcHistory.length > 0 &&
        calcHistory[0].expression === expression &&
        calcHistory[0].result === result
    ) return;

    calcHistory.unshift({ expression, result });
    if (calcHistory.length > 50) calcHistory.pop();

    localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';

    if (calcHistory.length === 0) {
        const emptyMsg       = document.createElement('div');
        emptyMsg.className   = 'history-empty';
        emptyMsg.textContent = 'No history yet';
        historyList.appendChild(emptyMsg);
        return;
    }

    calcHistory.forEach(item => {
        const itemDiv    = document.createElement('div');
        itemDiv.className = 'history-item';

        // Clicking a history entry restores its result
        itemDiv.addEventListener('click', () => {
            currentOperand    = item.result.toString();
            operation         = null;
            previousOperand   = '';
            shouldResetScreen = true;
            updateDisplay();
        });

        const expDiv       = document.createElement('div');
        expDiv.className   = 'history-expr';
        expDiv.textContent = `${item.expression} =`;

        const resDiv       = document.createElement('div');
        resDiv.className   = 'history-result';
        resDiv.textContent = item.result;

        itemDiv.appendChild(expDiv);
        itemDiv.appendChild(resDiv);
        historyList.appendChild(itemDiv);
    });
}

// ── Toggle History Panel ──────────────────────────────────────────────────────
if (toggleHistoryBtn && historyPanel) {
    toggleHistoryBtn.addEventListener('click', () => {
        historyPanel.classList.toggle('hidden');
    });
}

// ── Clear History ─────────────────────────────────────────────────────────────
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        calcHistory = [];
        localStorage.removeItem('calcHistory');
        renderHistory();
    });
}

// ── Copy Result to Clipboard ──────────────────────────────────────────────────
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const value = resultDisplay.textContent;
        if (!value || value === '0') return;
        navigator.clipboard.writeText(value).catch(() => {
            // Fallback for older browsers
            const ta    = document.createElement('textarea');
            ta.value    = value;
            ta.style.position = 'fixed';
            ta.style.opacity  = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        });

        // Brief visual feedback on the icon
        const icon       = copyBtn.querySelector('.material-symbols-outlined');
        icon.textContent = 'check';
        setTimeout(() => { icon.textContent = 'content_copy'; }, 1200);
    });
}

// ── Button Click Events ───────────────────────────────────────────────────────
document.querySelectorAll('button[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});

document.querySelectorAll('button[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.getAttribute('data-operator'));
    });
});

document.querySelectorAll('button[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        if (action === 'clear')     clear();
        if (action === 'calculate') calculate();
    });
});

// Visual press-flash on glass buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.add('pressed');
        setTimeout(() => this.classList.remove('pressed'), 150);
    });
});

// ── Keyboard Support ──────────────────────────────────────────────────────────
window.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9')                   { appendNumber(e.key);       flashKey(e.key, 'number'); }
    else if (e.key === '.')                              { appendNumber('.');          flashKey('.', 'number'); }
    else if (e.key === '=' || e.key === 'Enter')        { e.preventDefault(); calculate();  flashKey('calculate', 'action'); }
    else if (e.key === 'Backspace')                     { deleteNumber(); }
    else if (e.key === 'Escape')                        { clear();                    flashKey('clear', 'action'); }
    else if (['+', '-', '*', '/', '%'].includes(e.key)) { chooseOperation(e.key);     flashKey(e.key, 'operator'); }
});

function flashKey(key, type) {
    let btn;
    if (type === 'number')   btn = document.querySelector(`button[data-number="${key}"]`);
    else if (type === 'operator') btn = document.querySelector(`button[data-operator="${key}"]`);
    else if (type === 'action')  btn = document.querySelector(`button[data-action="${key}"]`);

    if (btn) {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 130);
    }
}

// ── Init ──────────────────────────────────────────────────────────────────────
clear();
renderHistory();
