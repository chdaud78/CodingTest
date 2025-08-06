// DFS
function solution(numbers, target) {
  let answer = 0;

  const dfs = (index, sum) => {
    if (index === numbers.length) {
      if (sum === target) answer++;
      return;
    }

    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  };

  dfs(0, 0);
  return answer;
}

// BFS - 실행 테스트 타임아웃
// function solution(numbers, target) {
//     let queue = [];
//     let answer = 0;

//     // 초기 상태 [현재 합계, 인덱스]
//     queue.push([0, 0]);

//     while (queue.length > 0) {
//         const [currentSum, index] = queue.shift();

//         // 모든 숫자를 사용했을 때
//         if (index === numbers.length) {
//             if (currentSum === target) answer++;
//         } else {
//             // 다음 숫자를 더하거나 빼는 두 가지 경우를 큐에 추가
//             queue.push([currentSum + numbers[index], index + 1]);
//             queue.push([currentSum - numbers[index], index + 1]);
//         }
//     }

//     return answer;
// }

// function solution(numbers, target) {
//     let answer = 0;
//     const THRESHOLD = 15;

//     function hybridDFS(index, sum) {
//         if (index >= THRESHOLD) {
//             bfs(index, sum);
//             return;
//         }

//         if (index === numbers.length) {
//             if (sum === target) answer++;
//             return;
//         }

//         hybridDFS(index + 1, sum + numbers[index]);
//         hybridDFS(index + 1, sum - numbers[index]);
//     }

//     function bfs(startIndex, startSum) {
//         let queue = [[startSum, startIndex]];

//         while (queue.length) {
//             const [currentSum, idx] = queue.shift();

//             if (idx === numbers.length) {
//                 if (currentSum === target) answer++;
//                 continue;
//             }

//             queue.push([currentSum + numbers[idx], idx + 1]);
//             queue.push([currentSum - numbers[idx], idx + 1]);
//         }
//     }

//     hybridDFS(0, 0);
//     return answer;
// }
