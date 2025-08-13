// 정수 삼각형

/**
 * ✏️ 목표
 * - 학교를 갈 수 있는 최단 경로의 개수
 *
 * ► 예상 로직 (DP)
 * 1. dp를 통해 거리들을 0으로 초기화한다.
 * 2. 시작점을 1로 초기화하고, 갈 수 있는 방법들을 하나씩 더해준다. (조건에 따라 1000000007 나눈 나머지로 저장)
 * 3. 마지막 dp의 배열 값이 가짓수 이므로 return한다.
 */

function solution(m, n, puddles) {
  if (typeof m !== 'number' || typeof n !== 'number' || m <= 0 || m > 100 || n <= 0 || n > 100) {
    throw new TypeError('m과 n은 1~100 사이의 숫자여야 합니다.');
  }

  if (!Array.isArray(puddles) || puddles.length > 10) {
    throw new TypeError('puddles는 10개이하의 배열이어야 합니다.');
  }

  let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  dp[1][1] = 1;

  for(let i = 1 ; i <= n ; i++) {
    for(let j = 1 ; j <= m ; j++) {
      if(i === 1 && j === 1) continue;
      if(puddleCheck(j,i, puddles)) continue;
      dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % 1000000007;
    }
  }

  return dp[n][m];
}

function puddleCheck (x,y, puddles) {
  for(const [px, py] of puddles) {
    if(y === py && x === px) return true;
  }
  return false;
}

/**
 * 📖 풀이 과정 설명
 * 1. `dp`는 `n,m` 각각보다 1씩 크게 만들어 경계 조건을 쉽게 처리한다.
 * 2. 행 1부터 n까지, 열 1부터 m까지 순회하며
 * 시작점은 건너뛴다.
 * 해당 칸이 puddle이면 건너뛴다.
 * 그렇지 않으면, 위쪽 + 왼쪽 경로 수를 더해 저장한다.
 * 3. 모든 조건을 통과하면 현재 위치를 이전 위치를 더해주어 가짓수를 추가해준다.
 * 4. `dp[n][m]`은 학교이므로 그때의 가짓수를 저장한다.
 */