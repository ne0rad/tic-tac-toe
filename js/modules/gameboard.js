// Module for manipulating the game board

const gameboard = (() => {
    const boardArr = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

    const square = (x, y) => {
    // return value of the square based on coordinates
    // | 1,1 | 1,2 | 1,3 |
    //  -----------------
    // | 2,1 | 2,2 | 2,3 |
    //  -----------------
    // | 3,1 | 3,2 | 3,3 |
        if(x > 3 || y > 3) return -1;
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
    return {square};
})();

export default gameboard;