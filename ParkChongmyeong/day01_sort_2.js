//[
//     [2, 5, 3], 
//     [4, 4, 1], 
//     [1, 7, 3]
// ]

function solution(array, commands) {
    var answer = [];
    
    for(var i = 0; i < commands.length; i++) {
        var test = [];
        test = array.slice(commands[i][0]-1, commands[i][1]);
        test.sort((a,b) => a-b);
        answer.push(test[commands[i][2]-1]);
    }
    
    return answer;
}
