const cpu = (() => {
    const randomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const openSquares = (board) => {
        let results = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] == -1) {
                results.push(i);
            }
        }
        return results;
    }

    const generateMove = (board) => {
        let x, y;
        let openMoves = openSquares(board);
        let randomMove = openMoves[randomInt(openMoves.length)];

        if (randomMove > 5) {
            x = 3;
            y = randomMove - 5;
        } else if (randomMove > 2) {
            x = 2;
            y = randomMove - 2;
        } else {
            x = 1;
            y = randomMove + 1;
        }

        return [x, y]; // return array with move coordinates
    }

    return { generateMove };

})();

export default cpu;