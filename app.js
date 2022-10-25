const NUMBERS = document.getElementsByClassName('number');
const OPERATORS = document.getElementsByClassName('operator');

const DISPLAY = document.querySelector("#current");
const LAST = document.querySelector('#last');
const CLEAR = document.querySelector('#clsBtn');
const DELETE = document.querySelector('#dltBtn');
const EQUAL = document.querySelector('#equal');
const DOT = document.querySelector('#dot');

//the number that is beeing written
let numberInSelection = 0;
let selectedNumbers = [];
let selectedOperators = [];

//numbers
for (let i = 0; i < NUMBERS.length; i++)
    NUMBERS[i].addEventListener('click', () => {
        DISPLAY.textContent += NUMBERS[i].textContent;

        numberInSelection = numberInSelection * 10 + parseInt(NUMBERS[i].textContent);
    });

//operators
for (let i = 0; i < OPERATORS.length; i++)
    OPERATORS[i].addEventListener('click', () => {
        DISPLAY.textContent += OPERATORS[i].textContent;

        selectedOperators.push(OPERATORS[i].textContent)
        selectedNumbers.push(numberInSelection);
        numberInSelection = 0;
    });

//Clear
CLEAR.addEventListener('click', () => {
    DISPLAY.textContent = '';
    LAST.textContent = '';
});

//Delete
DELETE.addEventListener('click', () => {
    DISPLAY.textContent = DISPLAY.textContent.slice(0, -1)
});

//Equal
EQUAL.addEventListener('click', () => {
    LAST.textContent = DISPLAY.textContent;

    selectedNumbers.push(numberInSelection);
    numberInSelection = 0;

    DISPLAY.textContent = evaluate(selectedNumbers, selectedOperators);
})

//Dot
DOT.addEventListener('click', () => {
    DISPLAY.textContent += ',';
})

function evaluate(numbers, operators){

    let index = 0;
    console.table(numbers);
    console.table(operators);

    while(true){
        let indexM = operators.indexOf('x');
        let indexD = operators.indexOf('/');

        if(indexD < 0 && indexM < 0) break;

        if(indexD < 0) index = indexM;
        else if(indexM < 0) index = indexD;
        else index = indexD < indexM ? indexD : indexM;

        console.log(index);

        if(operators[index] == '/') numbers[index] /= numbers[index + 1];
        else numbers[index] *= numbers[index + 1];

        numbers.splice(index + 1, 1);
        operators.splice(index, 1);
    }

    while(true){
        let indexP = operators.indexOf('+');
        let indexM = operators.indexOf('-');

        if(indexM < 0 && indexP < 0) break;

        if(indexM < 0) index = indexP;
        else if(indexP < 0) index = indexM;
        else index = indexM < indexP ? indexM : indexP;

        console.log(index);

        if(operators[index] == '+') numbers[index] += numbers[index + 1];
        else numbers[index] -= numbers[index + 1];

        numbers.splice(index + 1, 1);
        operators.splice(index, 1);
    }


    return numbers[0];
}