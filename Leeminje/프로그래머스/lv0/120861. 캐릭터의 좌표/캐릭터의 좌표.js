const solution = (keyinput, board) => {    
    let answer = [0, 0];
    for(let i of keyinput) {
        if(i === "up" && answer[1] < Math.floor(board[1]/2)) answer[1]++
        if(i === "down" && answer[1] > -Math.floor(board[1]/2)) answer[1]--;
        if(i ==="left" && answer[0] > -Math.floor(board[0]/2)) answer[0]--;
        if(i ==="right" && answer[0] < Math.floor(board[0]/2)) answer[0]++;
    }
    return answer;
}