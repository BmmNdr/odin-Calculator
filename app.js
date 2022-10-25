const NUMBERS = document.getElementsByClassName('number');
const OPERATORS = document.getElementsByClassName('operator');

const DISPLAY = document.querySelector("#current");
const LAST = document.querySelector('#last');
const CLEAR = document.querySelector('#clsBtn');
const DELETE = document.querySelector('#dltBtn');
const EQUAL = document.querySelector('#equal');
const DOT = document.querySelector('#dot');

//numbers
for (let i = 0; i < NUMBERS.length; i++)
    NUMBERS[i].addEventListener('click', () => {
        DISPLAY.textContent += NUMBERS[i].textContent;
    });

//operators
for (let i = 0; i < OPERATORS.length; i++)
    OPERATORS[i].addEventListener('click', () => {
        DISPLAY.textContent += OPERATORS[i].textContent;
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
    DISPLAY.textContent = '';
})

//Dot
DOT.addEventListener('click', () => {
    DISPLAY.textContent += ',';
})