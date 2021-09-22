import gameboard from './modules/gameboard.js';

document.getElementById("reset").addEventListener("click", () => gameboard.reset());

gameboard.generateSqares();