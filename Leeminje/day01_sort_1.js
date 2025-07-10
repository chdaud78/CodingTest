// 풀이
function solution(array, commands) {
  return commands.map(([i, j, k]) => {
    const customArray = array.slice(i - 1, j).sort((a, b) => a - b);
    return customArray[k - 1];
  });
}

// 정리
// const solution = (array, commands) => commands.map(([i, j, k]) => array.slice(i - 1, j).sort((a, b) => a - b)[k - 1]);
