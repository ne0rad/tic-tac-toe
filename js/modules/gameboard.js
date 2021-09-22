// Module for manipulating the game board

        // Board coordinates (x,y):
        // | 1,1 | 1,2 | 1,3 |
        //  -----------------
        // | 2,1 | 2,2 | 2,3 |
        //  -----------------
        // | 3,1 | 3,2 | 3,3 |

const gameboard = (() => {
    const boardArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    const square = (x, y) => {
        // return value of the square based on coordinates

        if(x > 3 || y > 3) return NaN;
        switch (x) {
            case 1:
                return boardArr[y-1];
            case 2:
                return boardArr[y+2];
            case 3:
                return boardArr[y+5];
            default:
                break;
        }
    }

    const play = (sign, x, y) => {
        // sign is "x" or "o"
        // put X or O on the board based on coordinates
        if(square(x,y) !== -1) return false;
        if(sign != "x" || sign != "o") return false;

        if(sign == "x") sign = 0;
        else sign = 1;

        switch (x) {
            case 1:
                boardArr[y-1] = sign;
                break;
            case 2:
                boardArr[y+2] = sign;
                break;
            case 3:
                boardArr[y+5] = sign;
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

    return {square, play, reset};
})();

export default gameboard;