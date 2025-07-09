const solution = board => {
    let coordinate = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let cntTotal = 0;
    
    board.forEach((row, i) => row.forEach((cell, j) => {
            if (cell===1) return false;
            return coordinate
                .some(([dx, dy]) => (i+dx>=0 
                                        && i+dx<board.length 
                                        && j+dy>=0 
                                        && j+dy<board[0].length 
                                        && board[i+dx][j+dy]===1)) ? false : cntTotal++;
        })
    );

    return cntTotal;
}