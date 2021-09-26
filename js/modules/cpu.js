const cpu = (() => {
    const randomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const openSquares = (board) => {
        let results = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == -1) {
                    results.push([i, j]);
                }
            }
        }
        if (results.length === 0) return false;
        return results;
    }

    const checkWin = (board) => {
        let win = false;
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === 0 && board[1][i] === 0 && board[2][i] === 0) win = -1;
            else if (board[i][0] === 0 && board[i][1] === 0 && board[i][2] === 0) win = -1;
            else if (board[0][i] === 1 && board[1][i] === 1 && board[2][i] === 1) win = 10;
            else if (board[i][0] === 1 && board[i][1] === 1 && board[i][2] === 1) win = 10;
        }
        if (board[0][0] === 0 && board[1][1] === 0 && board[2][2] === 0) win = -1;
        else if (board[0][2] === 0 && board[1][1] === 0 && board[2][0] === 0) win = -1;
        else if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) win = 10;
        else if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) win = 10;

        if (!win && openSquares(board).length === 0) win = 1;

        return win;
    }

    const generateMove = (board) => {
        let openMoves = openSquares(board);
        if(!openMoves) return false;

        let randomNum = randomInt(openMoves.length);
        let randomMove = openMoves[randomNum];

        return [randomMove[0] + 1, randomMove[1] + 1]; // return array with move coordinates
    }

    return { generateMove };

})();

export default cpu;