// 풀이
// function solution(array, commands) {
//   return commands.map(([i, j, k]) => {
//     const customArray = array.slice(i - 1, j).sort((a, b) => a - b);
//     return customArray[k - 1];
//   });
// }

// 정리
const solution = (array, commands) =>
  commands.map(([i, j, k]) => {
    const subArray = array.slice(i - 1, j);
    if (subArray.length === 1) return subArray[0];
    return subArray.sort((a, b) => a - b)[k - 1];
  });
