const numberButtons = document.getElementsByClassName('number');
const display = document.querySelector("#current")

for (let index = 0; index < numberButtons.length; index++) {
    const number = numberButtons[index];

    number.addEventListener('click', () => {
        display.textContent += number.textContent;
    })
}