function solution(triangle) {
  const n = triangle.length;

  for (let i = n - 2; i >= 0; i--) {        // 아래에서 위로
    for (let j = 0; j <= i; j++) {           // 각 행의 모든 칸
      const downLeft  = triangle[i + 1][j];
      const downRight = triangle[i + 1][j + 1];
      triangle[i][j] += Math.max(downLeft, downRight);
    }
  }

  return triangle[0][0];
}
