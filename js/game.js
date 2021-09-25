import gameboard from './modules/gameboard.js';
import player from './modules/player.js';

let playerOne = player("Player One"); // player(Player Name)
let playerTwo = player("Player Two");

// Variables for switching turns
let turn = true;
let matchTurn = true;

// Variables for UI
let nameChangeOn = false;
let nextRound = false;

let cpuEnabled = false;

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
    if (nameChangeOn) return;
    else if (!gameboard.play(x, y, turn)) return;
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
        toggleNextRound();
        matchTurn = !matchTurn; // Other player starts the next game
    }
}

const toggleNextRound = () => {
    if(nextRound) { 
        document.getElementById("nextRound").disabled = false;
        document.getElementById("display").className = "display greenText";
    } else {
        document.getElementById("nextRound").disabled = true;
        document.getElementById("display").className = "display";
    }
    nextRound = !nextRound;
}

const nextTurn = () => {
    let playerTurn;
    if (turn && matchTurn) playerTurn = 1;
    else if (!turn && matchTurn) playerTurn = 2;
    else if (turn && !matchTurn) playerTurn = 2;
    else playerTurn = 1;

    document.getElementById("result").textContent = playerTurn === 1 ?
        playerOne.getName() + " turn" :
        playerTwo.getName() + " turn";

    return playerTurn;
}

const updateScoreNames = () => {
    document.getElementById("playerOneName").textContent = playerOne.getName();
    document.getElementById("playerTwoName").textContent = playerTwo.getName();
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

const toggleNameChange = () => {
    if(!nameChangeOn) {
        document.getElementById("nameChange").style = "display: flex";
    } else {
        document.getElementById("nameChange").style = "display: none";
    }
    nameChangeOn = !nameChangeOn;
}

const changeName = () => {
    if(!nameChangeOn) return;
    let newNameOne = document.getElementById("playerOneInput").value;
    let newNameTwo = document.getElementById("playerTwoInput").value;

    if(newNameOne.length < 1) newNameOne = playerOne.getName();
    if(newNameTwo.length < 1) newNameTwo = playerTwo.getName();

    playerOne.setName(newNameOne);
    playerTwo.setName(newNameTwo);

    updateScoreNames();
    nextTurn();

    toggleNameChange();
}

const toggleCpu = () => {
    if(cpuEnabled) {
        document.getElementById("cpu").className = "cpuButton";
        document.getElementById("playerTwoInput").disabled = false;
        document.getElementById("playerTwoInput").value = "Player Two";
        nameChangeOn = true;
        changeName();
        document.getElementById("playerTwoInput").value = "";
    } else {
        document.getElementById("cpu").className = "cpuButton cpuEnabled";
        document.getElementById("playerTwoInput").disabled = true;
        document.getElementById("playerTwoInput").value = "CPU";
        nameChangeOn = true;
        changeName();
    }
    cpuEnabled = !cpuEnabled;
}

const nextRoundClick = () => {
    if(nameChangeOn) return;
    gameboard.reset();
    turn = true;
    toggleNextRound();
    nextTurn();
}

const startGame = () => {
    generateSquares();
    nextTurn();
    updateScoreNames();
    toggleNextRound();
    toggleCpu();
}

// Add event listeners
document.getElementById("nextRound").addEventListener("click", () => nextRoundClick());
document.getElementById("nameConfirm").addEventListener("click", () => changeName());
document.getElementById("nameCancel").addEventListener("click", () => toggleNameChange());
document.getElementById("nameOpen").addEventListener("click", () => toggleNameChange());
document.getElementById("cpu").addEventListener("click", () => toggleCpu());
document.addEventListener('keydown', function(e) {
    if(e.key === "Enter") changeName();
});


startGame();

