function solution(m, n, puddles) {
  const MOD = 1_000_000_007;

  // 웅덩이 표시: isPuddle[y][x] = true
  const isPuddle = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
  for (const [x, y] of puddles) {
    isPuddle[y][x] = true; // 좌표는 (열=x, 행=y)
  }

  // dp[y][x] = (1,1)에서 (x,y)까지 올 수 있는 경우의 수
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  dp[1][1] = 1; // 시작점

  for (let y = 1; y <= n; y++) {
    for (let x = 1; x <= m; x++) {
      if (y === 1 && x === 1) continue;      // 시작점은 이미 1
      if (isPuddle[y][x]) {               
        dp[y][x] = 0;
        continue;
      }
      dp[y][x] = (dp[y - 1][x] + dp[y][x - 1]) % MOD;
    }
  }

  return dp[n][m];
}
