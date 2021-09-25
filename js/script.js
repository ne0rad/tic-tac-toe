import gameboard from './modules/gameboard.js';
import player from './modules/player.js';

let playerOne = player("Player One"); // player(Player Name)
let playerTwo = player("Player Two");

// Variable for switching whose turn it is
let turn = true;
let matchTurn = true;

const generateSquares = () => {
    // Generate clickable squares / gameboard
    let gameDiv = document.getElementById("game");
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            let squareDiv = gameDiv.appendChild(document.createElement("div"));
            squareDiv.className = "square";
            squareDiv.id = `${i}${j}`;
            squareDiv.addEventListener("click", () => clickSquare(i, j));
        }
    }
}

const clickSquare = (x, y) => {
    if (gameboard.winStatus()) return;
    gameboard.play(x, y, turn);
    turn = !turn; // Set next turn for the next player
    let playerTurn = nextTurn() === 1 ? 2 : 1;
    let victor = gameboard.checkWin();
    if (victor) {
        if (victor === 'tie') document.getElementById("result").textContent = "It's a tie";
        else if (playerTurn === 1) {
            playerOne.victoryMsg();
            addScore(playerTurn);
        }
        else {
            playerTwo.victoryMsg();
            addScore(playerTurn);
        }
        matchTurn = !matchTurn; // Other player starts the next game
    }
}

const nextTurn = () => {
    let playerTurn;
    if (turn && matchTurn) playerTurn = 1;
    else if (!turn && matchTurn) playerTurn = 2;
    else if (turn && !matchTurn) playerTurn = 2;
    else playerTurn = 1;

    document.getElementById("result").textContent = playerTurn === 1 ?
        playerOne.name + " turn" :
        playerTwo.name + " turn";

    return playerTurn;
}

const updateScoreNames = () => {
    document.getElementById("playerOneName").textContent = playerOne.name;
    document.getElementById("playerTwoName").textContent = playerTwo.name;
}

const addScore = (playerTurn) => {
    if (playerTurn === 1) {
        playerOne.addPoint();
        document.getElementById("playerOneScore").textContent = playerOne.getPoints();
    } else {
        playerTwo.addPoint();
        document.getElementById("playerTwoScore").textContent = playerTwo.getPoints();
    }
}

const reset = () => {
    gameboard.reset();
    turn = true;
    nextTurn();
}

const startGame = () => {
    generateSquares();
    nextTurn();
    updateScoreNames();
}

// Add event listeners
document.getElementById("reset").addEventListener("click", () => reset());

startGame();

