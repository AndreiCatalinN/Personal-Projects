let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll('.square');
const colorsDisplay = document.querySelector('#colorDisplay');
const modeButtons = document.querySelectorAll('.mode');
const messageDisplay = document.querySelector('#message');
const resetB = document.querySelector('#reset');
const h1 = document.querySelector('h1');

init();

function init() {
    // difficulty buttons
    modeButtons.forEach((button, i) => {
        button.addEventListener( 'click', () =>  {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            button.classList.add('selected');
            button.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;
            reset();
        });
    });

    //squares
    for (let i=0 ; i<squares.length; i++) {
        squares[i].addEventListener('click', () => {
            let clickedColor = squares[i].style.backgroundColor;

            if ( clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetB.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                squares[i].style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
    reset();
}

// new game button
resetB.addEventListener('click', () => {
    reset();
});

// changes the colors to the winning color
function changeColors(color) {
    squares.forEach( square => {
        square.style.backgroundColor = color;
    });
}

//picks a random color from the array
function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// generates an array of random colors
function generateRandomColors(number) {
    let colors = [];

    for(let  i=0;i< number; i++ ){
        colors.push(randomColor());
    }
    return colors
}

// generates a random color
function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorsDisplay.textContent = pickedColor;
    resetB.textContent = 'New Colors';
    messageDisplay.textContent = "";
    h1.style.backgroundColor = 'steelblue';

    squares.forEach( (square, i) =>{
        square.style.backgroundColor = colors[i];
        if( colors[i]) {
            // update colorsDisplay
            square.style.display = 'block';
            square.style.backgroundColor = colors[i];
        } else {
            // hide 3 squares
            square.style.display = 'none';
        }
    });
}
