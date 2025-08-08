// BFS 시간 초과로 실패
// function solution(numbers, target) {
//     let queue = [[0, 0]]; //현재 합계, 숫자의 현재 위치
//     let count = 0; //성공 횟수

//     while (queue.length > 0) {
//         const [currentSum, index] = queue.shift();
//         //전부 사용했을때 종료
//         if (index === numbers.length) {
//             if (currentSum === target) {
//                 count++;
//             }
//         } else {
//             const currentNum = numbers[index];
//             queue.push([currentSum + currentNum, index + 1]);
//             queue.push([currentSum - currentNum, index + 1]);
//         }
//     }
//     return count;
// }

function solution(numbers, target) {
    let count = 0;
    function dfs(index, sum) {
        if (index === numbers.length) {
            if (sum === target) count++;
            return;
        }
        dfs(index + 1, sum + numbers[index]);
        dfs(index + 1, sum - numbers[index]);
    }
    dfs(0, 0);
    return count;
}
