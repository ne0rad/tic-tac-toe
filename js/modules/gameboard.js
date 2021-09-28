// Module for manipulating the game board

// Board coordinates (x,y):
// | 1,1 | 1,2 | 1,3 |
//  -----------------
// | 2,1 | 2,2 | 2,3 |
//  -----------------
// | 3,1 | 3,2 | 3,3 |

const gameboard = (() => {

    const boardArr = [
        [-1, -1, -1], 
        [-1, -1, -1], 
        [-1, -1, -1]
    ];
    let totalMoves = 0;
    let win = false;

    const square = (x, y) => {
        // return value of the square based on coordinates
        return boardArr[x - 1][y - 1];
    }

    const play = (x, y, turn) => {
        // sign is "x" or "o"
        // put X or O on the board based on coordinates
        if (square(x, y) !== -1 || win) return false;
        let squareDom = document.getElementById(`${x}${y}`);

        let sign;
        let numSign;
        if (turn) sign = 0; else sign = 1;

        squareDom.textContent = sign === 0 ? 'x' : 'o';
        boardArr[x - 1][y - 1] = sign;

        totalMoves++;
        return true;
    }

    const checkWin = () => {
        // Checking win conditions
        for (let i = 1; i <= 3; i++) {
                if (square(1, i) === 0 && square(2, i) === 0 && square(3, i) === 0) win = "x";
                else if (square(i, 1) === 0 && square(i, 2) === 0 && square(i, 3) === 0) win = "x";
                else if (square(1, i) === 1 && square(2, i) === 1 && square(3, i) === 1) win = "o";
                else if (square(i, 1) === 1 && square(i, 2) === 1 && square(i, 3) === 1) win = "o";
        }
        if (square(1, 1) === 0 && square(2, 2) === 0 && square(3, 3) === 0) win = "x";
        else if (square(1, 3) === 0 && square(2, 2) === 0 && square(3, 1) === 0) win = "x";
        else if (square(1, 1) === 1 && square(2, 2) === 1 && square(3, 3) === 1) win = "o";
        else if (square(1, 3) === 1 && square(2, 2) === 1 && square(3, 1) === 1) win = "o";

        if (!win && totalMoves === 9) win = "tie";

        if (!win) return false;
        else return win;
    }

    const getBoard = () => {
        return boardArr;
    }

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boardArr[i][j] = -1;
            }
        }
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                let squareDiv = document.getElementById(`${i}${j}`);
                squareDiv.textContent = "";
            }
        }
        win = false;
        totalMoves = 0;
    }

    return { square, play, reset, checkWin, getBoard };
})();

export default gameboard;