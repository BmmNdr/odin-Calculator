const NUMBERS = document.getElementsByClassName('number');
const OPERATORS = document.getElementsByClassName('operator');

const DISPLAY = document.querySelector("#current");
const LAST = document.querySelector('#last');
const CLEAR = document.querySelector('#clsBtn');
const DELETE = document.querySelector('#dltBtn');
const EQUAL = document.querySelector('#equal');
const DOT = document.querySelector('#dot');

const HTML = document.querySelector('html');

//the number that is beeing written
let numberInSelection = 0;
let selectedNumbers = [];
let selectedOperators = [];

let lastIsNumber = false;
let isAfterEqual = false;

const NumberRegex = new RegExp('[0-9]');
const OperatorRegex = new RegExp('[+*\/-]');

//Keyboard input
HTML.addEventListener('keyup', (e) => {
    console.log(e.key);

    if(NumberRegex.test(e.key))
        NumberIn(parseInt(e.key));
    else if(OperatorRegex.test(e.key))
        OperatorIn(e.key);
    else if(e.key === "Enter")
        equal();
    else if(e.key === "Escape")
        clear();
    else if(e.key === "Backspace")
        dlt();
})

//numbers
for (let i = 0; i < NUMBERS.length; i++)
    NUMBERS[i].addEventListener('click', () => NumberIn(parseInt(NUMBERS[i].textContent)));

function NumberIn(n) {
    if (isAfterEqual) {
        isAfterEqual = false;
        DISPLAY.textContent = "";
        numberInSelection = 0;
    }

    DISPLAY.textContent += n;
    numberInSelection = numberInSelection * 10 + n;
    lastIsNumber = true;
}

//operators
for (let i = 0; i < OPERATORS.length; i++)
    OPERATORS[i].addEventListener('click', () => OperatorIn(OPERATORS[i].textContent));

function OperatorIn(op){
    if (lastIsNumber) {
        DISPLAY.textContent += op;

        selectedOperators.push(op)

        selectedNumbers.push(numberInSelection);
        numberInSelection = 0;

        lastIsNumber = false;
        isAfterEqual = false;
    }
}

//Clear
CLEAR.addEventListener('click', () => clear());

function clear(){
    DISPLAY.textContent = '';
    LAST.textContent = '';
    numberInSelection = 0;
    selectedNumbers.length = 0;
    selectedOperators.lenght = 0;

    lastIsNumber = false;
    isAfterEqual = true;
}

//Delete
DELETE.addEventListener('click', () => dlt());

function dlt(){
    let last = DISPLAY.textContent.charAt(DISPLAY.textContent.length - 1);

    if (NumberRegex.test(last)) {
        let tmp = numberInSelection.toString();
        numberInSelection = Number(tmp.substring(0, tmp.length - 1))
    }
    else {
        selectedOperators.pop();
        numberInSelection = selectedNumbers.pop();
    }


    DISPLAY.textContent = DISPLAY.textContent.slice(0, -1)
}

//Equal
EQUAL.addEventListener('click', () => equal());

function equal(){
    if (lastIsNumber) {
        LAST.textContent = DISPLAY.textContent;

        selectedNumbers.push(numberInSelection);

        numberInSelection = evaluate(selectedNumbers, selectedOperators);
        DISPLAY.textContent = numberInSelection;

        selectedNumbers.length = 0;
        selectedOperators.lenght = 0;

        isAfterEqual = true;
    }
}

//Dot
DOT.addEventListener('click', () => {
    DISPLAY.textContent += ',';

    //TODO add float numbers
})

//TODO evaluate parentesis
function evaluate(numbers, operators) {
    let index = 0;

    //console.table(numbers);
    //console.table(operators);

    while (true) {
        let indexM = operators.indexOf('*');
        let indexD = operators.indexOf('/');

        if (indexD < 0 && indexM < 0) break;
        if (indexD < 0) index = indexM;
        else if (indexM < 0) index = indexD;
        else index = indexD < indexM ? indexD : indexM;

        //console.log(index);

        if (operators[index] == '/') numbers[index] /= numbers[index + 1];
        else numbers[index] *= numbers[index + 1];

        numbers.splice(index + 1, 1);
        operators.splice(index, 1);
    }

    while (true) {
        let indexP = operators.indexOf('+');
        let indexM = operators.indexOf('-');

        if (indexM < 0 && indexP < 0) break;
        if (indexM < 0) index = indexP;
        else if (indexP < 0) index = indexM;
        else index = indexM < indexP ? indexM : indexP;

        //console.log(index);

        if (operators[index] == '+') numbers[index] += numbers[index + 1];
        else numbers[index] -= numbers[index + 1];

        numbers.splice(index + 1, 1);
        operators.splice(index, 1);
    }


    return numbers[0];
}