const NUMBERS = document.getElementsByClassName('number');
const DISPLAY = document.querySelector("#current");
const CLEAR = document.getElementById('clsBtn');

for (let i = 0; i < NUMBERS.length; i++)    NUMBERS[i].addEventListener('click', () => { DISPLAY.textContent += NUMBERS[i].textContent; });

CLEAR.addEventListener('click', () => {DISPLAY.textContent = ''});