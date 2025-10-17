class Calculator {
    /**
     * Constructs a new Calculator instance.
     * @param {HTMLElement} previousOperandTextElement - The HTML element to display the previous operand and operation.
     * @param {HTMLElement} currentOperandTextElement - The HTML element to display the current operand.
     */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Initialize calculator state
    }

    /**
     * Clears all operands and the selected operation, resetting the calculator to its initial state.
     */
    clear() {
        this.currentOperand = '0'; // Start with '0' displayed
        this.previousOperand = '';
        this.operation = undefined;
    }

    /**
     * Deletes the last character from the current operand.
     * If the current operand becomes empty, it resets to '0'.
     */
    delete() {
        if (this.currentOperand === 'Error: Div by Zero') {
            this.clear(); // If an error is displayed, clear everything
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    /**
     * Appends a number to the current operand.
     * Prevents multiple decimal points in a single number.
     * @param {string} number - The number string to append.
     */
    appendNumber(number) {
        if (this.currentOperand === 'Error: Div by Zero') {
            this.currentOperand = ''; // Clear error message before appending
        }
        if (number === '.' && this.currentOperand.includes('.')) return; // Prevent multiple decimals
        // If current operand is '0' and a number (not '.') is appended, replace '0'
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    /**
     * Sets the operation for the calculation.
     * If a previous operation exists and there's a current operand, it computes the result first.
     * @param {string} operation - The selected operation (+, -, *, ÷).
     */
    chooseOperation(operation) {
        if (this.currentOperand === 'Error: Div by Zero') return; // Cannot choose operation after error
        if (this.currentOperand === '') return; // Cannot choose operation without a current number
        if (this.previousOperand !== '') {
            this.compute(); // If there's a previous number and operation, compute it
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand; // Move current to previous
        this.currentOperand = ''; // Clear current for new input
    }

    /**
     * Performs the calculation based on the stored operation and operands.
     * Handles division by zero and general calculation errors.
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Check for NaN inputs (e.g., if previous or current were empty strings initially)
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.currentOperand = 'Error: Div by Zero';
                    this.previousOperand = '';
                    this.operation = undefined;
                    return;
                }
                computation = prev / current;
                break;
            default:
                return; // No valid operation selected
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    /**
     * Formats a number for display, adding commas for thousands and handling decimals.
     * @param {number|string} number - The number to format.
     * @returns {string} The formatted number string.
     */
    getDisplayNumber(number) {
        if (number === 'Error: Div by Zero') {
            return number;
        }
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // Use toLocaleString for consistent number formatting (e.g., thousands separators)
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /**
     * Updates the text content of the display elements.
     */
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    /**
     * Initializes the calculator with an `initialValue` from URL parameters if present.
     * @param {string} value - The initial value to set.
     */
    setInitialValue(value) {
        if (!isNaN(parseFloat(value))) {
            this.currentOperand = value.toString();
            this.updateDisplay();
        }
    }
}

// Get all the DOM elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create a new calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// --- Event Listeners ---

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Equals button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// All Clear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', e => {
    // Numbers and decimal
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        e.preventDefault(); // Prevent default browser action (e.g., scrolling with space)
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    // Operations
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        // Map '/' to '÷' for display consistency
        calculator.chooseOperation(e.key === '/' ? '÷' : e.key);
        calculator.updateDisplay();
    }
    // Equals (Enter or =)
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    // Delete (Backspace)
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }
    // Clear (Escape)
    if (e.key === 'Escape') {
        e.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }
});


// --- URL Parameter Handling ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get('initialValue');

    if (initialValue) {
        calculator.setInitialValue(initialValue);
    } else {
        // Ensure display is updated even if no initial value
        calculator.updateDisplay();
    }
});