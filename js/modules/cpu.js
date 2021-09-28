const cpu = (() => {
    const randomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const openSquares = (board) => {
        if (board.length < 1) return false;
        let results = new Array();
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

    const winCheck = (board) => {
        let win = 0;
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === 0 && board[1][i] === 0 && board[2][i] === 0) win = -100;
            else if (board[i][0] === 0 && board[i][1] === 0 && board[i][2] === 0) win = -100;
            else if (board[0][i] === 1 && board[1][i] === 1 && board[2][i] === 1) win = 10;
            else if (board[i][0] === 1 && board[i][1] === 1 && board[i][2] === 1) win = 10;
        }
        if (board[0][0] === 0 && board[1][1] === 0 && board[2][2] === 0) win = -100;
        else if (board[0][2] === 0 && board[1][1] === 0 && board[2][0] === 0) win = -100;
        else if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) win = 10;
        else if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) win = 10;

        if (!win && !openSquares(board)) win = 1;

        return win;
    }

    const goodMove = (board, maximizing, winningMoves, depth) => {
        let newArr = [];
        for (let i = 0; i < board.length; i++)
            newArr[i] = board[i].slice();
        let points = winCheck(newArr);
        if (points !== 0) return points;


        let moves = openSquares(newArr);
        if (!moves || depth === 0) return 0;
        if (moves.length >= 8) {
            winningMoves.push([0, 0], [2, 2], [2, 0], [0, 2]);
            return;
        }
        let winningMove;
        if (maximizing) {
            let maxEval = -Infinity;
            moves.forEach(move => {
                let moveArr = [];
                for (let i = 0; i < newArr.length; i++)
                    moveArr[i] = newArr[i].slice();
                moveArr[move[0]][move[1]] = 1;
                let evaluation = goodMove(moveArr, false, winningMoves, depth - 1);
                if (evaluation > maxEval) {
                    winningMove = [move[0], move[1]];
                    maxEval = evaluation;
                }
            });
            if (depth === 5) winningMoves.push(winningMove);
            return maxEval;
        } else {
            let minEval = +Infinity;
            moves.forEach(move => {
                let moveArr = [];
                for (let i = 0; i < newArr.length; i++)
                    moveArr[i] = newArr[i].slice();
                moveArr[move[0]][move[1]] = 0;
                let evaluation = goodMove(moveArr, true, winningMoves, depth - 1);
                if (evaluation < minEval) {
                    winningMove = [move[0], move[1]];
                    minEval = evaluation;
                }
            });
            return minEval;
        }
    }

    const generateMove = (board, hardmode) => {
        if (hardmode) {
            let newArr = [];
            for (let i = 0; i < board.length; i++)
                newArr[i] = board[i].slice();
            const winningMoves = [];
            goodMove(newArr, true, winningMoves, 5);
            let move = winningMoves[randomInt(winningMoves.length - 1)];
            return [move[0] + 1, move[1] + 1];

        } else {
            let openMoves = openSquares(board);
            if (!openMoves) return false;

            let randomNum = randomInt(openMoves.length);
            let randomMove = openMoves[randomNum];

            return [randomMove[0] + 1, randomMove[1] + 1];
        }
    }

    return { generateMove };

})();

export default cpu;