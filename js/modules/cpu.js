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
        return results;
    }

    const generateMove = (board) => {
        let openMoves = openSquares(board);
        let randomMove = openMoves[randomInt(openMoves.length)];

        
        return [randomMove[0]+1, randomMove[1] + 1]; // return array with move coordinates
    }

    return { generateMove };

})();

export default cpu;