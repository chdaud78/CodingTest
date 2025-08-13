// N으로 표현

/**
 * ✏️ 문제
 * - number를 만드는 방법 중 N을 사용한 최소 횟수(최대 8회) 를 구하기
 *
 * ✏️ 목표
 * - 1회 ~ 8회까지 N을 사용해 만들 수 있는 모든 값들을 점진적으로 구성하면서
 *   목표값이 처음 등장하는 최소 사용 횟수를 반환
 *
 * ✏️ 해결 전략
 * 1) dp[i] = N을 i번 사용해서 만들 수 있는 모든 값의 집합(Set).
 * 2) 각 단계 i에서:
 *    - 이어붙인 수를 dp[i]에 추가.
 *    - 사칙연산으로 조합해 dp[i]를 확장
 * 3) "특정 값 v를 만드는 최소 사용 횟수"를 기록하여 더 비싼 비용으로 같은 값을 다시 넣지 않음
 * 4) 각 단계에서 목표값이 만들어지면 즉시 반환(조기 종료).
 * 5) 8회까지 못 만들면 -1 반환.
 */

// ✅ 풀이 코드
function solution(N, number, LIMIT = 64000) {
  if (N === number) return 1;

  // 값 범위 제한 (0이면 제한 해제). 지나치게 큰 중간값 배제
  const inRange = (x) => LIMIT === 0 || (-LIMIT <= x && x <= LIMIT);

  // minCost: 값 -> 그 값을 만들 수 있는 최소 사용 횟수
  const minCost = new Map();

  // dp[i]: N을 i번 사용해서 만들 수 있는 값들의 집합
  const dp = Array.from({ length: 9 }, () => new Set());

  // dp[i]에 값 추가(전역 최소 사용 횟수 갱신 및 목표 체크)
  let found = false;
  const makeAdder = (bucket, cost) => (val) => {
    if (!inRange(val)) return;
    const prev = minCost.get(val);
    if (prev !== undefined && prev <= cost) return; // 더 비싼 비용이면 스킵
    minCost.set(val, cost);
    bucket.add(val);
    if (val === number) found = true; // 조기 종료 플래그
  };

  // 이어붙인 수
  let concatNum = 0;

  // i = N 사용 횟수 (1 ~ 8)
  for (let i = 1; i <= 8; i++) {
    const add = makeAdder(dp[i], i);

    // 1) 이어붙인 수 추가하기
    concatNum = concatNum * 10 + N;
    add(concatNum);
    if (found) return i;

    // 2) 분할 조합
    const half = Math.floor(i / 2);
    for (let j = 1; j <= half; j++) {
      const leftOperands = Array.from(dp[j]);
      const rightOperands = Array.from(dp[i - j]);

      // Set -> Array 후 인덱스 for 루프(이터레이터 오버헤드 줄이기)
      for (let li = 0, L = leftOperands.length; li < L; li++) {
        const left = leftOperands[li];
        for (let ri = 0, R = rightOperands.length; ri < R; ri++) {
          const right = rightOperands[ri];

          // 교환법칙 연산: 한 번만 생성
          add(left + right);
          add(left * right);

          // 비교환 연상: 양방향 모두 생성
          add(left - right);
          add(right - left);

          // 나눗셈: 0 나눔 방지 + 0쪽으로 버림(Math.trunc)
          if (right !== 0) add(Math.trunc(left / right));
          if (left !== 0) add(Math.trunc(right / left));
        }
      }

      if (found) return i; // 중간에도 목표 나오면 조기 종료
    }

    if (found) return i;
  }

  // 실패
  return -1;
}

/**
 * 📖 풀이 과정 정리
 *
 * 0️⃣ DP를 쓰는 이유
 * - i회에 만들 수 있는 모든 값을 dp[i]에 모아두면,
 *   (j, i-j)로 쪼개 두 집합의 모든 조합을 사칙연산으로 합성해 dp[i]를 만들 수 있음.
 * - 같은 값을 더 큰 비용으로 다시 만들 필요가 없으므로 전역 최소 비용(minCost)으로 가지치기.
 *
 * 1️⃣ 이어붙인 수 처리
 * - i가 1씩 증가할 때마다 concatNum = concatNum * 10 + N 방식으로
 *   문자열 변환 없이 빠르게 N, NN, NNN을 생성.
 *
 * 2️⃣ 대칭 분할
 * - (j, i-j)와 (i-j, j)는 교환이므로 j ≤ ⌊i/2⌋까지만 탐색해 중복 절감.
 * - +, *는 교환법칙이 있어 한 번만 생성하고,
 *   -, /는 순서에 따라 결과가 다르므로 양방향 모두 생성.
 *
 * 3️⃣ 조기 종료
 * - 값 추가 시마다 목표값을 체크해 발견 즉시 반환 → 불필요한 연산 감소.
 *
 * 4️⃣ 범위 제한(LIMIT)
 * - 중간값이 너무 커지면 이후 연산에도 잘 쓰이지 않으므로
 *   LIMIT 바깥의 값은 버려 성능을 높일 수 있음.
 *   (정확도가 중요하면 LIMIT=0으로 꺼도 됨)
 *
 * 5️⃣ 복잡도 관점
 * - i ≤ 8로 매우 작고, 각 dp의 크기는 가지치기로 제어됨.
 *   실전 코딩테스트 환경에서 충분히 빠르게 동작.
 *
 * 💡 팁
 * - LIMIT를 상황에 맞게 조정(작게: 빠름, 크게/0: 보수적 정확성↑).
 * - 필요하면 Set → Array 변환을 같은 i 안에서 캐싱해도 되지만
 *   보통 위 코드만으로도 충분히 통과됨.
 */

// ✅ 이전 코드
/**
function solution(N, number) {
  if (N === number) return 1;

  const dp = Array.from({ length: 9 }, () => new Set());
  const concat = (n, k) => Number(String(n).repeat(k));
  const truncDiv = (a, b) => Math.trunc(a / b); // 0쪽으로 버림

  for (let i = 1; i <= 8; i++) {
    // 1) 연속된 N(i개)로 만든 수 추가
    dp[i].add(concat(N, i));

    // 2) j + (i-j)로 쪼개서 합성
    for (let j = 1; j < i; j++) {
      for (const a of dp[j]) {
        for (const b of dp[i - j]) {
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(b - a);
          dp[i].add(a * b);
          if (b !== 0) dp[i].add(truncDiv(a, b));
          if (a !== 0) dp[i].add(truncDiv(b, a));
        }
      }
    }

    // 3) 목표 수가 만들어졌는지 확인
    if (dp[i].has(number)) return i;
  }

  return -1; // 8번까지 안 되면 -1
}
*/

/**
 * 📖 이전 풀이의 한계
 * - 동일한 값을 더 많은 N 사용 횟수로 다시 만드는 경우도 계속 저장되어, 연산량이 증가함.
 * - 매우 큰 수나 음수도 모두 저장하므로, 불필요하게 탐색하게 됨.
 * - 목표값이 나와도 해당 i 루프를 끝까지 돌아야 하므로 불필요한 연산이 발생
 * - for-of 순회만 사용해 반복 시마다 이터레이터 오버헤드가 발생할 수. ㅣㅆ음
 */
