import gameboard from './modules/gameboard.js';
import player from './modules/player.js';
import cpu from './modules/cpu.js';

const PLAYER_ONE_NAME = 'Player One';
const PLAYER_TWO_NAME = 'Player Two';

let playerOne = player(PLAYER_ONE_NAME);
let playerTwo = player(PLAYER_TWO_NAME);

// Variables for switching turns
let turn = true;
let matchTurn = true;

// Variables for UI
let nameChangeOn = false;
let nextRound = false;

let cpuEnabled = false;
let uiDisabled = false;

let hardmode = false;

const generateSquares = () => {
    // Generate clickable squares / gameboard in DOM
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

const clickSquare = (x, y, isCpu) => {
    if (nameChangeOn) return;
    else if (cpuEnabled && !turn && !isCpu) return;
    else if (!gameboard.play(x, y, turn)) return; // Places either X or O on the board
    turn = !turn; // Set next turn for the next player
    nextTurn();
    let victor = gameboard.checkWin();
    if (victor) {
        if (victor === 'tie') document.getElementById("result").textContent = "It's a tie";
        else if (!turn) {
            playerOne.victoryMsg();
            addScore();
        }
        else {
            playerTwo.victoryMsg();
            addScore();
        }
        toggleNextRound();
        if (matchTurn) turn = false; // Different player starts next round
        else turn = true;
        matchTurn = !matchTurn; // Other player starts the next game
    } else {
        if (cpuEnabled && !turn) {
            cpuMove();
        }
    }
}

const cpuMove = () => {
    // CPU makes the move
    let move = cpu.generateMove(gameboard.getBoard(), hardmode);
    if (move) {
        toggleDisable();
        setTimeout(() => {
            clickSquare(move[0], move[1], true);
            toggleDisable();
        }
            , 500, move);
    }
}

const toggleNextRound = () => {
    if (nextRound) {
        document.getElementById("nextRound").disabled = false;
        document.getElementById("display").className = "display greenText";
    } else {
        document.getElementById("nextRound").disabled = true;
        document.getElementById("display").className = "display";
    }
    nextRound = !nextRound;
}

const nextTurn = () => {
    let playerTurn = turn ? 1 : 2;

    document.getElementById("result").textContent = playerTurn === 1 ?
        playerOne.getName() + " turn" :
        playerTwo.getName() + " turn";

    return playerTurn;
}

const updateScoreNames = () => {
    document.getElementById("playerOneName").textContent = playerOne.getName();
    document.getElementById("playerTwoName").textContent = playerTwo.getName();
}

const addScore = () => {
    if (!turn) {
        playerOne.addPoint();
        document.getElementById("playerOneScore").textContent = playerOne.getPoints();
    } else {
        playerTwo.addPoint();
        document.getElementById("playerTwoScore").textContent = playerTwo.getPoints();
    }
}

const resetScore = () => {
    playerOne.setScore(0);
    playerTwo.setScore(0);
    document.getElementById("playerOneScore").textContent = 0;
    document.getElementById("playerTwoScore").textContent = 0;

}

const toggleNameChange = () => {
    if (!nameChangeOn) {
        document.getElementById("nameChange").style = "display: flex";
    } else {
        document.getElementById("nameChange").style = "display: none";
    }
    nameChangeOn = !nameChangeOn;
}

const changeName = () => {
    if (!nameChangeOn) return;
    let newNameOne = document.getElementById("playerOneInput").value;
    let newNameTwo = document.getElementById("playerTwoInput").value;

    if (newNameOne.length < 1) newNameOne = playerOne.getName();
    if (newNameTwo.length < 1) newNameTwo = playerTwo.getName();

    playerOne.setName(newNameOne);
    playerTwo.setName(newNameTwo);

    updateScoreNames();
    nextTurn();

    toggleNameChange();
}

const toggleCpu = () => {
    if (uiDisabled) return;
    if (cpuEnabled) {
        document.getElementById("cpu").className = "cpuButton";
        document.getElementById("playerTwoInput").disabled = false;
        playerTwo.setName(PLAYER_TWO_NAME);
        document.getElementById("playerTwoName").textContent = PLAYER_TWO_NAME;
        document.getElementById("playerTwoInput").value = "";
    } else {
        document.getElementById("cpu").className = "cpuButton cpuEnabled";
        document.getElementById("playerTwoInput").disabled = true;
        document.getElementById("playerTwoInput").value = "CPU";
        playerTwo.setName("CPU");
        document.getElementById("playerTwoName").textContent = "CPU";
    }
    reset();
    cpuEnabled = !cpuEnabled;
}

const toggleHardmode = () => {
    if(!cpuEnabled) return;
    if(hardmode) {
        document.getElementById("cpuHard").className = "cpuButton";
    } else {
        document.getElementById("cpuHard").className = "cpuButton cpuEnabled";
    }
    hardmode = !hardmode;
}

const nextRoundClick = () => {
    if (nameChangeOn || uiDisabled) return;
    gameboard.reset();
    toggleNextRound();

    if (!turn && cpuEnabled) {
        cpuMove();
    }

    nextTurn();
}

const toggleDisable = () => {
    uiDisabled = !uiDisabled;
}

const reset = () => {
    if (uiDisabled) return;
    gameboard.reset();
    turn = true;
    matchTurn = true;
    nextRound = false;
    nextTurn();
    toggleNextRound();
    resetScore();
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
document.getElementById("reset").addEventListener("click", () => reset());
document.getElementById("nameConfirm").addEventListener("click", () => changeName());
document.getElementById("nameCancel").addEventListener("click", () => toggleNameChange());
document.getElementById("nameOpen").addEventListener("click", () => toggleNameChange());
document.getElementById("cpu").addEventListener("click", () => toggleCpu());
document.getElementById("cpuHard").addEventListener("click", () => toggleHardmode());
document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") changeName();
});


startGame();
