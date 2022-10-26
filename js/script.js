// FUNCTIONS 

class Calculator {
    constructor(prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear();
    };

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    };

    appendNum(number){
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        };
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation){
        if(this.currentOperand === ''){
            return;
        };

        if (this.prevOperandText !== ''){
            this.compute();
        };

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    };

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)){
            return;
        };
        switch(this.operation){
            case '+': computation = prev + curr;
            break;

            case '-': computation = prev - curr;
            break;

            case '÷': computation = prev / curr;
            break;

            case '*': computation = prev * curr;
            break;

            default: return;
        };

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplayNum(number){
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0});
        }

       if (decimalDigits != null) {
           return `${integerDisplay}.${decimalDigits}`;
       }
       else {
           return integerDisplay;
       }
    };

    updateDisplay(){
        this.currOperandText.innerText = this.getDisplayNum(this.currentOperand);
        if(this.operation != null){
            this.prevOperandText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.prevOperandText.innerText = '';
        }
    };
};

// === BRING IN VARIABLES
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-ac]');
const prevOperandText = document.querySelector('[data-previous-operand]');
const currOperandText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(prevOperandText, currOperandText);


// ACTIVATE BUTTONS AND THEIR FUNCTIONS

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});