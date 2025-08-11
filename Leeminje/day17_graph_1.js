// 순위

/** ✏️ 목표
 * - 누락된 결과가 있어도 추이성으로 승/패 관계를 복원하고
 *   (이긴 수 + 진 수) === n - 1 인 선수(순위가 확정되는 선수) 수를 구하기
 *
 * ► 예상 로직
 * 1. 입력 검증
 * 2. 승리 관계를 '비트셋 행렬'로 구성 (winBits[i] = i가 이기는 선수들의 비트셋)
 * 3. 전이 폐쇄: i가 k를 이기면, winBits[i] |= winBits[k]  (행 단위 OR)
 * 4. 패배 집합 만들기: 전이 후 win을 전치해서 loseBits 구성
 * 5. 각 i에 대해 (wins + losses === n - 1)이면 카운트
 */

function solution(n, results) {
  if (!Number.isInteger(n) || n < 1 || n > 100) throw new TypeError('n은 1 이상 100 이하의 정수');
  if (!Array.isArray(results)) throw new TypeError('results는 2차원 배열');

  // 비트셋 파라미터
  const W = 32;
  const WORDS = Math.ceil((n + 1) / W);

  // --- 비트셋 유틸 ---
  const setBit = (row, j) => {
    const idx = (j / W) | 0;
    const off = j % W;
    row[idx] |= (1 << off) >>> 0;
  };

  const hasBit = (row, j) => {
    const idx = (j / W) | 0;
    const off = j % W;
    return (row[idx] >>> off) & 1;
  };

  const orRow = (row, other) => {
    for (let w = 0; w < WORDS; w++) row[w] |= other[w];
  };

  const pop32 = (x) => {
    x = x - ((x >>> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >>> 2) & 0x33333333);
    return (((x + (x >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
  };

  const countBits = (row) => {
    let s = 0;
    for (let w = 0; w < WORDS; w++) s += pop32(row[w]);
    return s;
  };
  // -------------------------------------------------------

  // 2) 초기 승리 행렬(비트셋)
  const winBits = Array.from({ length: n + 1 }, () => new Uint32Array(WORDS));

  for (const e of results) {
    if (!Array.isArray(e) || e.length !== 2) continue;
    let [a, b] = e;
    if (!Number.isInteger(a) || !Number.isInteger(b)) continue;
    if (a < 1 || a > n || b < 1 || b > n || a === b) continue;
    setBit(winBits[a], b); // a가 b를 이김
  }

  // 3) 전이 폐쇄 (Floyd–Warshall의 j-루프를 비트 OR로 대체)
  // k를 경유점으로 두고, i가 k를 이기면 i의 승리집합에 k의 승리집합을 합친다.
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      if (i === k) continue;
      if (hasBit(winBits[i], k)) orRow(winBits[i], winBits[k]);
    }
  }

  // 4) 패배 행렬(전치 이용)
  const loseBits = Array.from({ length: n + 1 }, () => new Uint32Array(WORDS));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) continue;
      if (hasBit(winBits[i], j)) setBit(loseBits[j], i);
    }
  }

  // 5) 순위 확정
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    const wins = countBits(winBits[i]);
    const losses = countBits(loseBits[i]);
    if (wins + losses === n - 1) answer++;
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1️⃣ 그래프를 '행 단위 비트셋'으로 표현
 *    - winBits[i]의 j번째 비트가 1이면 "i가 j를 이김"을 의미.
 *    - Uint32Array를 사용해 메모리 효율과 연산 속도를 높..
 *
 * 2️⃣ 전이 폐쇄 최적화
 *    - 전통적인 Floyd–Warshall은 k, i, j 삼중 루프를 사용.
 *    - 여기선 j 전체를 도는 대신,
 *      "i가 k를 이기면 winBits[i] |= winBits[k]" 한 번의 비트 OR 연산으로
 *      k가 이기는 모든 선수를 i의 승리 집합에 병합
 *    - 이렇게 하면 j-루프가 사라져 O(n³/32)로 빨라짐
 *
 * 3️⃣ 패배 집합 구성
 *    - 전이 후, winBits 행렬을 전치(transpose)하여 loseBits 생성.
 *    - loseBits[j]는 "j를 이긴 선수들"의 비트셋이 됨
 *
 * 4️⃣ 순위 확정 판정
 *    - wins = winBits[i]의 popcount (i가 이긴 선수 수)
 *    - losses = loseBits[i]의 popcount (i를 이긴 선수 수)
 *    - wins + losses === n - 1 → i의 상대적 순위가 완전 결정
 */
