const player1Display = document.querySelector('#s1');
const player2Display = document.querySelector('#s2');
const player1button = document.querySelector('#player1');
const player2button = document.querySelector('#player2');
const resetButton = document.querySelector('#reset');
let playingToDisplay = document.querySelector('#playingTo');
let input  = document.querySelector('input');

let p1score = 0;
let p2score = 0;
let gameOver = false;
let winningScore = 5;

function reset() {
    p1score = 0;
    p2score = 0;
    gameOver = false;

    player1Display.textContent = 0;
    player2Display.textContent = 0;

    player1Display.classList.remove('winner');
    player2Display.classList.remove('winner');
}

input.addEventListener('change', () => {
    winningScore = Number(input.value);
    playingToDisplay.textContent = winningScore;
    reset();
});

player1button.addEventListener('click', () => {
   if (!gameOver){
       p1score++;
       if (p1score === winningScore){
           gameOver = true;
           player1Display.classList.add('winner');
       }
       player1Display.textContent = p1score;
   }
});

player2button.addEventListener('click', () => {
    if (!gameOver) {
        p2score++;
        if (p2score === winningScore){
            gameOver = true;
            player2Display.classList.add('winner');
        }
        player2Display.textContent = p2score;
    }
});

resetButton.addEventListener('click', () => {
    reset();
});







