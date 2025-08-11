function solution(N, number) {
  // N 하나로 바로 만들 수 있으면 1
  if (N === number) return 1;

  const dp = Array.from({ length: 9 }, () => new Set());

  for (let i = 1; i <= 8; i++) {
    //이어붙이기
    const concat = Number(String(N).repeat(i));
    dp[i].add(concat);

    //조합: i = j + (i - j)
    for (let j = 1; j < i; j++) {
      const A = dp[j];
      const B = dp[i - j];

      for (const a of A) {
        for (const b of B) {
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(b - a);
          dp[i].add(a * b);

          if (b !== 0) dp[i].add(Math.trunc(a / b));
          if (a !== 0) dp[i].add(Math.trunc(b / a));
        }
      }
    }

    // 목표 발견 시 최소 개수 i 반환
    if (dp[i].has(number)) return i;
  }

  // 8개 이내로 불가능
  return -1;
}
