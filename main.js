console.clear();

class Calculator {
    constructor(outputElement, previousOperandVariable) {
        this.previousOperandVariable = previousOperandVariable;
        this.outputElement = outputElement;
        this.reset()
    }
    reset() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calculate() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case 'x':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimanDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0'
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimanDigits != null) {
            return `${integerDisplay}.${decimanDigits}`;
        } else {
            return integerDisplay;
        }
        // const floatNumber = parseFloat(number);
        // if (isNaN(floatNumber)) {
        //     return '';
        // }
        // return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
        this.outputElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandVariable = this.getDisplayNumber(this.previousOperand);

        if (this.currentOperand == '') {
            this.outputElement.innerText = this.getDisplayNumber(this.previousOperand);
            if (this.previousOperand == '') {
                this.outputElement.innerText = '0'
            }
        }
    }
}

const deleteBtn = document.getElementById('calc-delete');
const resetBtn = document.getElementById('calc-reset');
const calculateBtn = document.getElementById('calc-calculate');
const calcOutput = document.getElementById('calc-output');
const operationBtns = document.querySelectorAll('[data-operation-btn]');
const numberBtns = document.querySelectorAll('[data-number-btn]');

let previousOperandVariable = 0;
const calculator = new Calculator(calcOutput, previousOperandVariable);

numberBtns.forEach(button => {
    button.addEventListener('click', e => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', e => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

calculateBtn.addEventListener('click', e => {
    calculator.calculate();
    calculator.updateDisplay();
});

resetBtn.addEventListener('click', e => {
    calculator.reset();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', e => {
    calculator.delete();
    calculator.updateDisplay();
});

calcOutput.innerText = '0';

const radioBtns = document.querySelectorAll('input[type="radio"]');
radioBtns.forEach(radio => {
    radio.addEventListener('click', e => {
        setTheme(radio.value);
    });
});

setTheme(localStorage.getItem('theme'));

function setTheme(number) {
    document.body.classList.remove('theme-1');
    document.body.classList.remove('theme-2');
    document.body.classList.remove('theme-3');

    document.body.classList.add(`theme-${number}`);
    localStorage.setItem('theme', number);

    radioBtns[number - 1].checked = true;
}
