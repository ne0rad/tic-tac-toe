// Module for manipulating the game board

// Board coordinates (x,y):
// | 1,1 | 1,2 | 1,3 |
//  -----------------
// | 2,1 | 2,2 | 2,3 |
//  -----------------
// | 3,1 | 3,2 | 3,3 |

const gameboard = (() => {
    const boardArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    let totalMoves = 0;

    const square = (x, y) => {
        // return value of the square based on coordinates

        if (x > 3 || y > 3) return NaN;
        switch (x) {
            case 1:
                return boardArr[y - 1];
            case 2:
                return boardArr[y + 2];
            case 3:
                return boardArr[y + 5];
            default:
                break;
        }
    }

    const play = (x, y) => {
        // sign is "x" or "o"
        // put X or O on the board based on coordinates
        if (square(x, y) !== -1) return false;

        let squareDom = document.getElementById(`${x}${y}`);
        let numMoves = moves();
        let sign;
        let numSign;
        if (numMoves % 2 === 0) { sign = 'x'; numSign = 0 }
        else { sign = 'o'; numSign = 1; }

        switch (x) {
            case 1:
                boardArr[y - 1] = numSign;
                squareDom.textContent = sign;
                break;
            case 2:
                boardArr[y + 2] = numSign;
                squareDom.textContent = sign;
                break;
            case 3:
                boardArr[y + 5] = numSign;
                squareDom.textContent = sign;
                break;
            default:
                break;
        }

        return true;
    }

    const reset = () => {
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i] = -1;
        }
    }

    const moves = () => {
        return totalMoves++;
    }

    const generateSqares = () => {
        let gameDiv = document.getElementById("game");
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                let squareDiv = gameDiv.appendChild( document.createElement("div") );
                squareDiv.className = "square";
                squareDiv.id = `${i}${j}`;
                squareDiv.addEventListener("click", () => play(i,j));
            }
        }
    }

    return { square, play, reset, generateSqares };
})();

export default gameboard;